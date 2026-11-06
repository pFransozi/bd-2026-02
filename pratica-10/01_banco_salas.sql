-- Aula 10 - Prática guiada: Sistema de Reserva de Salas
-- Execute uma única vez, no Query Tool conectado ao banco pratica_salas.
-- Não execute no banco laboratorio: o banco da prática é separado.

CREATE TABLE bloco (
    id_bloco INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome_bloco VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE sala (
    id_sala INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_bloco INTEGER NOT NULL REFERENCES bloco (id_bloco),
    nome VARCHAR(60) NOT NULL,
    capacidade INTEGER NOT NULL CHECK (capacidade BETWEEN 1 AND 80),
    ativa BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT uq_sala_bloco UNIQUE (id_bloco, nome)
);

CREATE TABLE usuario (
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE
);

-- Uma reserva ocupa exatamente um horário de 1 hora, iniciando em hora cheia.
-- Este modelo simplificado não contempla reservas de duração variável.
CREATE TABLE reserva (
    id_reserva INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_sala INTEGER NOT NULL REFERENCES sala (id_sala),
    id_usuario INTEGER NOT NULL REFERENCES usuario (id_usuario),
    data_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    finalidade VARCHAR(160) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT ck_reserva_hora CHECK (
        hora_inicio >= TIME '08:00'
        AND hora_inicio < TIME '22:00'
        AND EXTRACT(MINUTE FROM hora_inicio) = 0
        AND EXTRACT(SECOND FROM hora_inicio) = 0
    ),
    CONSTRAINT uq_sala_horario UNIQUE (id_sala, data_reserva, hora_inicio)
);

INSERT INTO bloco (nome_bloco)
VALUES ('Bloco A'), ('Bloco B');

INSERT INTO sala (id_bloco, nome, capacidade, ativa)
VALUES
    (1, 'Laboratório 101', 36, TRUE),
    (1, 'Sala 102', 45, TRUE),
    (2, 'Sala 201', 30, TRUE),
    (2, 'Laboratório 202', 24, TRUE);

INSERT INTO usuario (nome, email)
VALUES
    ('Ana Martins', 'ana.martins@exemplo.edu'),
    ('Bruno Costa', 'bruno.costa@exemplo.edu'),
    ('Carla Souza', 'carla.souza@exemplo.edu');

INSERT INTO reserva (id_sala, id_usuario, data_reserva, hora_inicio, finalidade)
VALUES
    (1, 1, DATE '2026-11-12', TIME '08:00', 'Aula de Banco de Dados'),
    (2, 2, DATE '2026-11-12', TIME '08:00', 'Projeto de Software'),
    (1, 3, DATE '2026-11-12', TIME '10:00', 'Monitoria'),
    (3, 2, DATE '2026-11-13', TIME '14:00', 'Reunião de projeto');

-- Conferência: deverão existir 2 blocos, 4 salas, 3 usuários e 4 reservas.
SELECT
    (SELECT COUNT(*) FROM bloco) AS blocos,
    (SELECT COUNT(*) FROM sala) AS salas,
    (SELECT COUNT(*) FROM usuario) AS usuarios,
    (SELECT COUNT(*) FROM reserva) AS reservas;