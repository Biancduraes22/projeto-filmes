const Database = require('better-sqlite3');
const fs = require('fs');

const db = new Database('database.db');
const schema = fs.readFileSync('./src/database/schema.sql', 'utf-8');

db.exec(schema);

console.log('Banco criado com sucesso!');