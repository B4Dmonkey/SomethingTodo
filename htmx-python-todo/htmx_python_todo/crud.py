from .db.db import get_connection


def readAll():
    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
    return rows
