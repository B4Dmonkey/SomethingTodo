import os
from .db.db import get_connection


def create(title, completed=False):
    with get_connection() as cur:
        sql = "INSERT INTO TODOs (title, completed) VALUES (?, ?)"
        cur.execute(sql, (title, completed))


def readAll():
    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
    return rows


def delRecord(rowId: int):
    with get_connection() as cur:
        sql = "DELETE FROM TODOs WHERE id = ?"
        cur.execute(sql, (rowId,))
