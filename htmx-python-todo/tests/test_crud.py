from htmx_python_todo.crud import create, readAll, delRecord
from htmx_python_todo.db.db import get_connection, create_table
from htmx_python_todo.db.seed import seed
from htmx_python_todo.models import TodoItem

create_table() # * Should be in a before all probably


def deleteAllRecords():
    with get_connection() as db:
        db.execute("DELETE FROM TODOs")


def test_create():
    deleteAllRecords()
    newItem = TodoItem("Test Create")
    create(newItem)
    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
        assert len(rows) == 1
        assert rows[0][1] == "Test Create"


def test_readAll():
    deleteAllRecords()
    seed()
    rows = readAll()
    assert len(rows) == 3


def test_delRecord():
    deleteAllRecords()
    newItem = TodoItem("Test Create")
    create(newItem)

    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
        assert len(rows) == 1
        itemId = rows[0][0]
  
    delRecord(itemId)

    with get_connection() as db:
        rows = db.execute("SELECT * FROM TODOs").fetchall()
        assert len(rows) == 0


# def test_update():
#     deleteAllRecords()
#     create("Test Create")

#     with get_connection() as db:
#         rows = db.execute("SELECT * FROM TODOs").fetchall()
#         assert len(rows) == 1
#         itemId = rows[0][0]

#     with get_connection() as db:
#         db.execute("UPDATE TODOs SET completed = 1 WHERE id = ?", (itemId,))

#     with get_connection() as db:
#         rows = db.execute("SELECT * FROM TODOs").fetchall()
#         assert rows[0][2] == 1