"""Aula 10: cliente de reservas com MySQL Connector/Python.

Prepare o esquema da prática e salve o arquivo .env ao lado deste programa.
"""

from datetime import date, datetime
from os import getenv
from pathlib import Path

import mysql.connector
from dotenv import load_dotenv
from mysql.connector import errorcode

load_dotenv(Path(__file__).with_name(".env"))


def conectar():
    """Abre uma conexão com o mesmo banco usado no editor SQL."""
    return mysql.connector.connect(
        host=getenv("MYSQL_HOST", "127.0.0.1"),
        port=int(getenv("MYSQL_PORT", "3306")),
        database=getenv("MYSQL_DATABASE", "pratica_salas"),
        user=getenv("MYSQL_USER", "aluno"),
        password=getenv("MYSQL_PASSWORD", ""),
        autocommit=False,
    )


def listar_salas():
    with conectar() as conn, conn.cursor() as cur:
        cur.execute("""
            SELECT s.id_sala, b.nome_bloco, s.nome, s.capacidade
            FROM sala AS s
            JOIN bloco AS b ON b.id_bloco = s.id_bloco
            WHERE s.ativa = TRUE
            ORDER BY s.id_sala
        """)
        linhas = cur.fetchall()

    print("\nSALAS ATIVAS")
    for identificador, bloco, nome, capacidade in linhas:
        print(f"{identificador}: {nome} ({bloco}) - {capacidade} lugares")


def listar_usuarios():
    with conectar() as conn, conn.cursor() as cur:
        cur.execute("SELECT id_usuario, nome FROM usuario ORDER BY id_usuario")
        linhas = cur.fetchall()

    print("\nUSUÁRIOS")
    for identificador, nome in linhas:
        print(f"{identificador}: {nome}")


def listar_reservas():
    with conectar() as conn, conn.cursor() as cur:
        cur.execute("""
            SELECT r.id_reserva, r.data_reserva,
                   TIME_FORMAT(r.hora_inicio, '%H:%i') AS hora,
                   s.nome, u.nome, r.finalidade
            FROM reserva AS r
            JOIN sala AS s ON s.id_sala = r.id_sala
            JOIN usuario AS u ON u.id_usuario = r.id_usuario
            ORDER BY r.data_reserva, r.hora_inicio, r.id_reserva
        """)
        linhas = cur.fetchall()

    print("\nRESERVAS CADASTRADAS")
    if not linhas:
        print("Nenhuma reserva cadastrada.")
    for identificador, data, hora, sala, usuario, finalidade in linhas:
        print(f"#{identificador} | {data} {hora} | {sala} | {usuario} | {finalidade}")


def criar_reserva():
    print("\nNOVA RESERVA (horários de 1 hora, em hora cheia)")
    try:
        id_usuario = int(input("ID do usuário: ").strip())
        id_sala = int(input("ID da sala: ").strip())
        data = date.fromisoformat(input("Data (AAAA-MM-DD): ").strip())
        hora = datetime.strptime(input("Hora (HH:MM): ").strip(), "%H:%M").time()
        finalidade = input("Finalidade: ").strip()
        if not finalidade:
            print("Informe uma finalidade.")
            return
    except ValueError:
        print("Dados inválidos. Verifique os IDs, a data e a hora.")
        return

    with conectar() as conn, conn.cursor() as cur:
        try:
            # O driver associa a tupla de valores aos marcadores %s.
            cur.execute("""
                INSERT INTO reserva
                    (id_usuario, id_sala, data_reserva, hora_inicio, finalidade)
                VALUES (%s, %s, %s, %s, %s)
            """, (id_usuario, id_sala, data, hora, finalidade))
            identificador = cur.lastrowid
            conn.commit()
        except mysql.connector.Error as erro:
            conn.rollback()
            if erro.errno == errorcode.ER_DUP_ENTRY:
                print("Horário indisponível: a sala já está reservada nesse período.")
            elif erro.errno == errorcode.ER_NO_REFERENCED_ROW_2:
                print("Reserva rejeitada: sala ou usuário inexistente (FOREIGN KEY).")
            elif erro.errno == errorcode.ER_CHECK_CONSTRAINT_VIOLATED:
                print("Reserva rejeitada: use hora cheia entre 08:00 e 21:00 (CHECK).")
            else:
                raise
            return

    print(f"Reserva confirmada. ID: {identificador}")


def main():
    while True:
        print("\n=== SISTEMA DE RESERVA DE SALAS ===")
        print("1 - Listar salas")
        print("2 - Listar usuários")
        print("3 - Listar reservas")
        print("4 - Criar reserva")
        print("0 - Sair")
        opcao = input("Opção: ").strip()
        if opcao == "0":
            print("Encerrado.")
            break
        try:
            if opcao == "1":
                listar_salas()
            elif opcao == "2":
                listar_usuarios()
            elif opcao == "3":
                listar_reservas()
            elif opcao == "4":
                criar_reserva()
            else:
                print("Escolha uma opção de 0 a 4.")
        except mysql.connector.Error as erro:
            print(f"Falha de banco de dados (erro MySQL {erro.errno}).")
            print("Confira o servidor, o banco e as configurações do .env.")
        except ValueError:
            print("Confira se MYSQL_PORT contém apenas o número da porta no .env.")


if __name__ == "__main__":
    main()
