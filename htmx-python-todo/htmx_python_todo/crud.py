import os
from .db.db import get_connection

sql_file_dir = f"{os.path.dirname(__file__)}/db"


def create(title, completed=False):
    sql_file_path = f"{sql_file_dir}/create.sql"
    with get_connection() as cur, open(sql_file_path, "r") as f:
        sql = f.read()
        cur.execute(sql, (title, completed))


def readAll():
    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
    return rows
