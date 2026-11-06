"""Aula 10: pequeno cliente de reservas com PostgreSQL e psycopg 3.

Pré-requisitos: executar 01_banco_salas.sql em pratica_salas e preparar .env.
"""

from datetime import date, time
from os import getenv

import psycopg
from dotenv import load_dotenv
from psycopg.errors import CheckViolation, ForeignKeyViolation

load_dotenv()


def conectar():
    """O driver abre uma conexão com o servidor PostgreSQL."""
    return psycopg.connect(
        host=getenv("PGHOST", "127.0.0.1"),
        port=int(getenv("PGPORT", "5432")),
        dbname=getenv("PGDATABASE", "pratica_salas"),
        user=getenv("PGUSER", "aluno"),
        password=getenv("PGPASSWORD"),
    )


def listar_salas():
    with conectar() as conn:
        with conn.cursor() as cur:
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
    with conectar() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id_usuario, nome FROM usuario ORDER BY id_usuario")
            linhas = cur.fetchall()

    print("\nUSUÁRIOS")
    for identificador, nome in linhas:
        print(f"{identificador}: {nome}")


def listar_reservas():
    with conectar() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT r.id_reserva, r.data_reserva, r.hora_inicio,
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
        print(f"#{identificador} | {data} {hora:%H:%M} | {sala} | {usuario} | {finalidade}")


def criar_reserva():
    print("\nNOVA RESERVA (horários de 1 hora, em hora cheia)")
    try:
        id_usuario = int(input("ID do usuário: ").strip())
        id_sala = int(input("ID da sala: ").strip())
        data = date.fromisoformat(input("Data (AAAA-MM-DD): ").strip())
        hora = time.fromisoformat(input("Hora (HH:MM): ").strip())
        finalidade = input("Finalidade: ").strip()
        if not finalidade:
            print("Informe uma finalidade.")
            return
    except ValueError:
        print("Dados inválidos. Verifique os IDs, a data e a hora.")
        return

    try:
        with conectar() as conn:
            with conn.cursor() as cur:
                # %s e a tupla de valores evitam concatenar dados à SQL.
                cur.execute("""
                    INSERT INTO reserva
                        (id_usuario, id_sala, data_reserva, hora_inicio, finalidade)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (id_sala, data_reserva, hora_inicio)
                    DO NOTHING
                    RETURNING id_reserva
                """, (id_usuario, id_sala, data, hora, finalidade))
                resultado = cur.fetchone()
        # Ao sair do `with` sem erro, psycopg confirma a transação.
        if resultado is None:
            print("Horário indisponível: a sala já está reservada nesse período.")
        else:
            print(f"Reserva confirmada. ID: {resultado[0]}")
    except ForeignKeyViolation:
        print("Reserva rejeitada: sala ou usuário inexistente (FOREIGN KEY).")
    except CheckViolation:
        print("Reserva rejeitada: use hora cheia entre 08:00 e 21:00 (CHECK).")


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
        except psycopg.Error as exc:
            print(f"Falha de banco de dados ({type(exc).__name__}).")
            print("Confira o servidor, o banco e as configurações do .env.")


if __name__ == "__main__":
    main()