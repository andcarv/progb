-- Limpar dados existentes (para poder rodar o seed repetidamente)
TRUNCATE events, users RESTART IDENTITY CASCADE;

-- Usuários
INSERT INTO users (name, email) VALUES
    ('Ana Silva',    'ana@email.com'),
    ('Bruno Costa',  'bruno@email.com'),
    ('Carla Souza',  'carla@email.com');

-- Eventos organizados pela Ana (id = 1)
INSERT INTO events (title, description, location, date, capacity, organizer_id) VALUES
    ('Hackathon UFS',
     'Maratona de programação de 24h aberta a todos os cursos',
     'Centro de Vivência - UFS', '2026-09-15 08:00', 50, 1),
    ('Workshop de Git',
     'Aprenda Git do zero com exercícios práticos',
     'Lab 1 - DCOMP', '2026-09-18 14:00', 25, 1),
    ('Café com Código',
     'Bate-papo informal sobre carreira em tech',
     'Cantina Central', '2026-09-22 10:00', 15, 1),
    ('Palestra: IA Generativa',
     'Introdução a LLMs e suas aplicações',
     'Auditório do CCET', '2026-10-01 19:00', 80, 1);

-- Eventos organizados pelo Bruno (id = 2)
INSERT INTO events (title, description, location, date, capacity, organizer_id) VALUES
    ('Meetup de TypeScript',
     'Palestra sobre tipos avançados em TS',
     'Auditório do DCOMP', '2026-09-20 19:00', 30, 2),
    ('Torneio de Ping-Pong',
     'Torneio aberto para a comunidade universitária',
     'Ginásio - UFS', '2026-09-25 15:00', 32, 2),
    ('Cineclube: Wargames',
     'Sessão comentada do filme Wargames (1983)',
     'Sala de Projeção - Biblioteca', '2026-10-05 18:30', 40, 2),
    ('Aulão de SQL',
     'Revisão intensiva de SQL para a prova',
     'Lab 2 - DCOMP', '2026-10-10 08:00', 35, 2);

-- Eventos organizados pela Carla (id = 3)
INSERT INTO events (title, description, location, date, capacity, organizer_id) VALUES
    ('Grupo de Estudos: Redes',
     'Estudo colaborativo dos capítulos 3 e 4 do Kurose',
     'Sala de Estudos - Biblioteca', '2026-09-19 16:00', 12, 3),
    ('Oficina de Arduino',
     'Monte seu primeiro circuito com Arduino Uno',
     'Lab de Eletrônica - DEL', '2026-09-28 09:00', 20, 3),
    ('Sarau Nerd',
     'Poesia, música e stand-up com tema de computação',
     'Praça da Reitoria', '2026-10-08 19:00', 60, 3),
    ('Corrida da Integração',
     'Corrida de 5km entre os cursos de exatas',
     'Pista de Atletismo - UFS', '2026-10-12 06:30', 100, 3);
