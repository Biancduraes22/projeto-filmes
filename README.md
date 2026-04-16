🎬 API de Filmes
📌 Sobre o projeto

API REST desenvolvida com Node.js, Express e SQLite para gerenciamento de filmes.
Permite realizar CRUD completo, além de filtros, ordenação e paginação.

🚀 Tecnologias
Node.js
Express
SQLite (better-sqlite3)

⚙️ Instalação e execução
git clone LINK_DO_SEU_REPOSITORIO
cd projeto-filmes
npm install
Criar banco:
node src/database/init.js
Inserir dados:
node src/database/seed.js
Rodar servidor:
node server.js

Acesse:

http://localhost:3000
📌 Rotas principais
GET /api/filmes → listar filmes
GET /api/filmes/:id → buscar por ID
POST /api/filmes → cadastrar
PUT /api/filmes/:id → atualizar
DELETE /api/filmes/:id → deletar

🔍 Filtros
/api/filmes?genero=Ação
/api/filmes?diretor=James
/api/filmes?nota_min=9
/api/filmes?ano_min=2010

🔽 Ordenação
/api/filmes?ordem=nota&direcao=desc
/api/filmes?ordem=titulo&direcao=asc

📄 Paginação
/api/filmes?pagina=1&limite=5
/api/filmes?pagina=2&limite=5

🔥 Exemplo completo
/api/filmes?genero=Ação&ordem=nota&direcao=desc&pagina=1&limite=5

⚠️ Validações
Campos obrigatórios
Ano e duração devem ser números
Nota entre 0 e 10

📊 Status Codes
200 → Sucesso
201 → Criado
400 → Erro de validação
404 → Não encontrado
500 → Erro interno
📦 Postman

Collection incluída com todos os testes da API.

👩‍💻 Autora

Bianca Durães