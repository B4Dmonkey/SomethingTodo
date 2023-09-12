import os
import sqlite3
from contextlib import contextmanager

sql_file_dir = os.path.dirname(__file__) # * note for future me I may want to have an sql folder


@contextmanager
def get_connection():
    conn = sqlite3.connect('TODO_DATABASE.db')
    yield conn.cursor()
    conn.commit()
    conn.close()  # * Be a good citizen and close the connection


def create_table():
    with get_connection() as cur:
        hasTodoTable = cur.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='TODOs'"
        ).fetchone()

        if hasTodoTable:
            print("Table already exists")
            return

        # * This has nothing to do with the talk and is pure learning
        sql_file_path = f"{sql_file_dir}/schema.sql"
        read = "r"
        with open(sql_file_path, read) as f:
            cur.execute(f.read())

        print("Table created")






