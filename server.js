const express = require('express');
const app = express();
const db = require('./src/database/db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Filmes funcionando!');
});


app.get('/api/filmes', (req, res) => {
    try {
        const {
            genero,
            diretor,
            nota_min,
            nota_max,
            ano_min,
            ano_max,
            ordem,
            direcao,
            pagina = 1,
            limite = 10
        } = req.query;

        let sql = 'SELECT * FROM filmes WHERE 1=1';
        const params = [];

        if (genero) {
            sql += ' AND genero = ?';
            params.push(genero);
        }

        if (diretor) {
            sql += ' AND diretor LIKE ?';
            params.push(`%${diretor}%`);
        }

        if (nota_min) {
            sql += ' AND nota >= ?';
            params.push(parseFloat(nota_min));
        }

        if (nota_max) {
            sql += ' AND nota <= ?';
            params.push(parseFloat(nota_max));
        }

        if (ano_min) {
            sql += ' AND ano >= ?';
            params.push(parseInt(ano_min));
        }

        if (ano_max) {
            sql += ' AND ano <= ?';
            params.push(parseInt(ano_max));
        }

        let countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');

        const camposValidos = ['titulo', 'diretor', 'ano', 'duracao', 'nota', 'genero', 'created_at'];

        if (ordem && camposValidos.includes(ordem)) {
            sql += ` ORDER BY ${ordem}`;

            if (direcao === 'desc') {
                sql += ' DESC';
            } else {
                sql += ' ASC';
            }
        } else {
            sql += ' ORDER BY id ASC';
        }

        const paginaNum = parseInt(pagina);
        const limiteNum = parseInt(limite);

        if (isNaN(paginaNum) || paginaNum < 1) {
            return res.status(400).json({ erro: 'Página inválida' });
        }

        if (isNaN(limiteNum) || limiteNum < 1) {
            return res.status(400).json({ erro: 'Limite inválido' });
        }

        const countStmt = db.prepare(countSql);
        const { total } = countStmt.get(...params);

        const offset = (paginaNum - 1) * limiteNum;
        sql += ' LIMIT ? OFFSET ?';
        params.push(limiteNum, offset);

        const stmt = db.prepare(sql);
        const filmes = stmt.all(...params);

        res.status(200).json({
            dados: filmes,
            paginacao: {
                pagina_atual: paginaNum,
                itens_por_pagina: limiteNum,
                total_itens: total,
                total_paginas: Math.ceil(total / limiteNum)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar filmes' });
    }
});


app.get('/api/filmes/:id', (req, res) => {
    try {
        const { id } = req.params;

        const filme = db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);

        if (!filme) {
            return res.status(404).json({ erro: 'Filme não encontrado' });
        }

        res.status(200).json(filme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao buscar filme' });
    }
});


app.post('/api/filmes', (req, res) => {
    try {
        const { titulo, diretor, ano, duracao, nota, genero } = req.body;

        if (!titulo || !diretor || !ano || !duracao || nota === undefined || !genero) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios: titulo, diretor, ano, duracao, nota e genero'
            });
        }

        if (isNaN(ano) || parseInt(ano) <= 0) {
            return res.status(400).json({ erro: 'O ano deve ser um número válido' });
        }

        if (isNaN(duracao) || parseInt(duracao) <= 0) {
            return res.status(400).json({ erro: 'A duração deve ser um número válido' });
        }

        if (isNaN(nota) || parseFloat(nota) < 0 || parseFloat(nota) > 10) {
            return res.status(400).json({ erro: 'A nota deve estar entre 0 e 10' });
        }

        const stmt = db.prepare(`
            INSERT INTO filmes (titulo, diretor, ano, duracao, nota, genero)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            titulo,
            diretor,
            parseInt(ano),
            parseInt(duracao),
            parseFloat(nota),
            genero
        );

        const novoFilme = db.prepare('SELECT * FROM filmes WHERE id = ?').get(result.lastInsertRowid);

        res.status(201).json({
            mensagem: 'Filme cadastrado com sucesso',
            filme: novoFilme
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao cadastrar filme' });
    }
});

app.put('/api/filmes/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, diretor, ano, duracao, nota, genero } = req.body;

        const filmeExistente = db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);

        if (!filmeExistente) {
            return res.status(404).json({ erro: 'Filme não encontrado' });
        }

        if (!titulo || !diretor || !ano || !duracao || nota === undefined || !genero) {
            return res.status(400).json({
                erro: 'Todos os campos são obrigatórios: titulo, diretor, ano, duracao, nota e genero'
            });
        }

        if (isNaN(ano) || parseInt(ano) <= 0) {
            return res.status(400).json({ erro: 'O ano deve ser um número válido' });
        }

        if (isNaN(duracao) || parseInt(duracao) <= 0) {
            return res.status(400).json({ erro: 'A duração deve ser um número válido' });
        }

        if (isNaN(nota) || parseFloat(nota) < 0 || parseFloat(nota) > 10) {
            return res.status(400).json({ erro: 'A nota deve estar entre 0 e 10' });
        }

        const stmt = db.prepare(`
            UPDATE filmes
            SET titulo = ?, diretor = ?, ano = ?, duracao = ?, nota = ?, genero = ?
            WHERE id = ?
        `);

        stmt.run(
            titulo,
            diretor,
            parseInt(ano),
            parseInt(duracao),
            parseFloat(nota),
            genero,
            id
        );

        const filmeAtualizado = db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);

        res.status(200).json({
            mensagem: 'Filme atualizado com sucesso',
            filme: filmeAtualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao atualizar filme' });
    }
});

// DELETAR FILME
app.delete('/api/filmes/:id', (req, res) => {
    try {
        const { id } = req.params;

        const filmeExistente = db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);

        if (!filmeExistente) {
            return res.status(404).json({ erro: 'Filme não encontrado' });
        }

        db.prepare('DELETE FROM filmes WHERE id = ?').run(id);

        res.status(200).json({ mensagem: 'Filme deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao deletar filme' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});