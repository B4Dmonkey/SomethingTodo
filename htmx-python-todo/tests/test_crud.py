from htmx_python_todo.db.db import get_connection, seed
from htmx_python_todo.crud import readAll

def deleteAllRecords():
    with get_connection() as db:
        db.execute("DELETE FROM TODOs")


def test_readAll():
    deleteAllRecords()
    seed()
    rows = readAll()
    assert len(rows) == 3