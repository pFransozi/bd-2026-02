-- Aula 10 · Prática de reserva de salas · MySQL 8.0.16 ou posterior
-- Execute no esquema vazio preparado na etapa 02. A carga é feita uma vez.
-- Se o laboratório atribuiu outro esquema, ajuste o comando USE.

USE pratica_salas;

CREATE TABLE bloco (
    id_bloco INT AUTO_INCREMENT PRIMARY KEY,
    nome_bloco VARCHAR(60) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE sala (
    id_sala INT AUTO_INCREMENT PRIMARY KEY,
    id_bloco INT NOT NULL,
    nome VARCHAR(60) NOT NULL,
    capacidade INT NOT NULL,
    ativa BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_sala_bloco FOREIGN KEY (id_bloco) REFERENCES bloco (id_bloco),
    CONSTRAINT ck_sala_capacidade CHECK (capacidade BETWEEN 1 AND 80),
    CONSTRAINT uq_sala_bloco UNIQUE (id_bloco, nome)
) ENGINE=InnoDB;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_sala INT NOT NULL,
    id_usuario INT NOT NULL,
    data_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    finalidade VARCHAR(160) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reserva_sala FOREIGN KEY (id_sala) REFERENCES sala (id_sala),
    CONSTRAINT fk_reserva_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    CONSTRAINT ck_reserva_hora CHECK (
        hora_inicio >= TIME '08:00:00'
        AND hora_inicio < TIME '22:00:00'
        AND MINUTE(hora_inicio) = 0
        AND SECOND(hora_inicio) = 0
    ),
    CONSTRAINT uq_sala_horario UNIQUE (id_sala, data_reserva, hora_inicio)
) ENGINE=InnoDB;

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
    (1, 1, '2026-11-12', '08:00:00', 'Aula de Banco de Dados'),
    (2, 2, '2026-11-12', '08:00:00', 'Projeto de Software'),
    (1, 3, '2026-11-12', '10:00:00', 'Monitoria'),
    (3, 2, '2026-11-13', '14:00:00', 'Reunião de projeto');

SELECT
    (SELECT COUNT(*) FROM bloco) AS blocos,
    (SELECT COUNT(*) FROM sala) AS salas,
    (SELECT COUNT(*) FROM usuario) AS usuarios,
    (SELECT COUNT(*) FROM reserva) AS reservas;
