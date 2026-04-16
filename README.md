🎬 API de Filmes
📌 Sobre o projeto

Esta é uma API RESTful desenvolvida com Node.js, Express e SQLite para gerenciamento de filmes.

🚀 Tecnologias utilizadas
Node.js
Express
SQLite (better-sqlite3)
JavaScript
⚙️ Como instalar o projeto
1. Clonar o repositório
git clone LINK_DO_SEU_REPOSITORIO
2. Acessar a pasta
cd projeto-filmes
3. Instalar as dependências
npm install
▶️ Como executar o projeto
1. Criar o banco de dados
node src/database/init.js
2. Inserir os dados (20 filmes)
node src/database/seed.js
3. Iniciar o servidor
node server.js

O servidor estará disponível em:

http://localhost:3000
📌 Rotas da API
🔹 Listar todos os filmes

GET /api/filmes

🔹 Buscar filme por ID

GET /api/filmes/:id

🔹 Cadastrar filme

POST /api/filmes

Exemplo de body:

{
  "titulo": "Matrix",
  "diretor": "Lana Wachowski",
  "ano": 1999,
  "duracao": 136,
  "nota": 9.3,
  "genero": "Ficção Científica"
}
🔹 Atualizar filme

PUT /api/filmes/:id

🔹 Deletar filme

DELETE /api/filmes/:id

🔍 Filtros disponíveis
Filtrar por gênero:
/api/filmes?genero=Ação
Filtrar por diretor:
/api/filmes?diretor=James
Filtrar por nota mínima:
/api/filmes?nota_min=9
Filtrar por ano mínimo:
/api/filmes?ano_min=2010
🔽 Ordenação
Ordenar por nota (decrescente):
/api/filmes?ordem=nota&direcao=desc
Ordenar por título:
/api/filmes?ordem=titulo&direcao=asc
📄 Paginação
Página 1:
/api/filmes?pagina=1&limite=5
Página 2:
/api/filmes?pagina=2&limite=5
🔥 Combinação de filtros

Exemplo:

/api/filmes?genero=Ação&ordem=nota&direcao=desc&pagina=1&limite=5
⚠️ Validações

A API possui validações para garantir a integridade dos dados:

Todos os campos são obrigatórios
Ano deve ser um número válido
Duração deve ser um número válido
Nota deve estar entre 0 e 10
📊 Status Codes
200 → Sucesso
201 → Criado com sucesso
400 → Erro de validação
404 → Não encontrado
500 → Erro interno
📦 Collection do Postman

