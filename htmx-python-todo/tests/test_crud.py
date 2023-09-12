from htmx_python_todo.db.db import get_connection
from htmx_python_todo.db.seed import seed
from htmx_python_todo.crud import create, readAll


def deleteAllRecords():
    with get_connection() as db:
        db.execute("DELETE FROM TODOs")


def test_create():
    deleteAllRecords()
    create("Test Create")
    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
        assert len(rows) == 1
        assert rows[0][1] == "Test Create"


def test_readAll():
    deleteAllRecords()
    seed()
    rows = readAll()
    assert len(rows) == 3
