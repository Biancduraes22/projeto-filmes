const db = require('./db');

db.prepare(`
INSERT INTO filmes (titulo, diretor, ano, duracao, nota, genero) VALUES
('Titanic', 'James Cameron', 1997, 195, 9.0, 'Romance'),
('Avatar', 'James Cameron', 2009, 162, 8.5, 'Ficção Científica'),
('Vingadores: Ultimato', 'Irmãos Russo', 2019, 181, 9.2, 'Ação'),
('Interestelar', 'Christopher Nolan', 2014, 169, 9.5, 'Ficção Científica'),
('Coringa', 'Todd Phillips', 2019, 122, 8.9, 'Drama'),
('Frozen', 'Chris Buck', 2013, 102, 7.5, 'Animação'),
('Toy Story', 'John Lasseter', 1995, 81, 8.3, 'Animação'),
('O Rei Leão', 'Roger Allers', 1994, 88, 9.1, 'Animação'),
('Invocação do Mal', 'James Wan', 2013, 112, 8.0, 'Terror'),
('Annabelle', 'John R. Leonetti', 2014, 99, 6.5, 'Terror'),
('Barbie', 'Greta Gerwig', 2023, 114, 7.8, 'Comédia'),
('Shrek', 'Andrew Adamson', 2001, 90, 8.5, 'Comédia'),
('Harry Potter e a Pedra Filosofal', 'Chris Columbus', 2001, 152, 8.2, 'Fantasia'),
('Jogos Vorazes', 'Gary Ross', 2012, 142, 7.9, 'Ação'),
('A Culpa é das Estrelas', 'Josh Boone', 2014, 126, 7.7, 'Romance'),
('Como Eu Era Antes de Você', 'Thea Sharrock', 2016, 110, 7.4, 'Romance'),
('Pantera Negra', 'Ryan Coogler', 2018, 134, 8.3, 'Ação'),
('Homem-Aranha: Sem Volta para Casa', 'Jon Watts', 2021, 148, 8.7, 'Ação'),
('Jurassic Park', 'Steven Spielberg', 1993, 127, 9.0, 'Ficção Científica'),
('Divertida Mente', 'Pete Docter', 2015, 95, 8.9, 'Animação')
`).run();

console.log('Dados inseridos com sucesso!');