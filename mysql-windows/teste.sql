-- Execute no banco laboratorio. Crie e preencha a tabela uma vez.
SELECT DATABASE() AS banco,
       CURRENT_USER() AS usuario,
       @@port AS porta_servidor,
       VERSION() AS versao;

CREATE TABLE centro_distribuicao (
    id_centro INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    cidade VARCHAR(80) NOT NULL,
    capacidade_diaria INT NOT NULL CHECK (capacidade_diaria > 0)
) ENGINE=InnoDB;

INSERT INTO centro_distribuicao (nome, cidade, capacidade_diaria)
VALUES
    ('CD Curitiba Norte', 'Curitiba', 600),
    ('CD Curitiba Sul', 'Curitiba', 800),
    ('CD São José', 'São José dos Pinhais', 650),
    ('CD Londrina', 'Londrina', 500);

SELECT id_centro, nome, cidade, capacidade_diaria
FROM centro_distribuicao
ORDER BY id_centro;

-- Retomada da Aula 09: agregação e agrupamento.
SELECT cidade,
       COUNT(*) AS total_centros,
       SUM(capacidade_diaria) AS capacidade_total
FROM centro_distribuicao
GROUP BY cidade
ORDER BY capacidade_total DESC;
