import os
from .db.db import get_connection
from .models import TodoItem


def create(item: TodoItem):
    with get_connection() as cur:
        sql = "INSERT INTO TODOs (title, completed) VALUES (?, ?)"
        cur.execute(sql, (item.title, item.completed))


def readAll():
    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
    return [TodoItem(itemId=row[0], title=row[1], completed=row[2]) for row in rows]


def update(rowId: int, item: TodoItem):
    with get_connection() as cur:
        sql = "UPDATE TODOs SET title = ?, completed = ? WHERE id = ?"
        cur.execute(sql, (item.title, item.completed, rowId))

def delRecord(rowId: int):
    with get_connection() as cur:
        sql = "DELETE FROM TODOs WHERE id = ?"
        cur.execute(sql, (rowId,))
