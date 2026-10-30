-- Execute no Query Tool, com o banco laboratorio selecionado.
-- Execute este script uma vez para criar os dados de exemplo.

SELECT current_database() AS banco, current_user AS usuario, version();

CREATE TABLE centro_distribuicao (
    id_centro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    cidade VARCHAR(80) NOT NULL,
    capacidade_diaria INTEGER NOT NULL CHECK (capacidade_diaria > 0)
);

INSERT INTO centro_distribuicao (nome, cidade, capacidade_diaria)
VALUES
    ('CD Curitiba Norte', 'Curitiba', 600),
    ('CD Curitiba Sul', 'Curitiba', 800),
    ('CD São José', 'São José dos Pinhais', 650),
    ('CD Londrina', 'Londrina', 500);

SELECT id_centro, nome, cidade, capacidade_diaria
FROM centro_distribuicao
ORDER BY id_centro;

-- Retomada do conteúdo da Aula 09: GROUP BY e agregação.
SELECT cidade, COUNT(*) AS total_centros, SUM(capacidade_diaria) AS capacidade_total
FROM centro_distribuicao
GROUP BY cidade
ORDER BY capacidade_total DESC;
