from htmx_python_todo.crud import create, readAll, update,  delRecord
from htmx_python_todo.db.db import get_connection, create_table
from htmx_python_todo.db.seed import seed
from htmx_python_todo.models import TodoItem

create_table()  # * Should be in a before all probably


def deleteAllRecords():
    with get_connection() as db:
        db.execute("DELETE FROM TODOs")


def get_test_item():
    rows = readAll()
    assert len(rows) == 1
    return rows[0]


def test_create():
    deleteAllRecords()

    newItem = TodoItem("Test Create")
    create(newItem)

    testItem = get_test_item()
    assert testItem.title == "Test Create"


def test_readAll():
    deleteAllRecords()

    seed()

    rows = readAll()
    assert len(readAll()) == 3
    assert type(rows[0]) == TodoItem


def test_delRecord():
    deleteAllRecords()
    create(TodoItem("Test Create"))

    testItem = get_test_item()

    delRecord(testItem.itemId)

    assert len(readAll()) == 0


def test_update():
    deleteAllRecords()

    create(TodoItem("Test Create", completed=False))

    testItem = get_test_item()
    # * This has nothing to do with htmx, I want to experiment with immutability and functional programming. This is just a future me reference
    update(testItem.itemId, TodoItem("Pop Lock & Drop It", completed=True))

    updatedTestItem = get_test_item()
    assert updatedTestItem.title == "Pop Lock & Drop It"
    assert updatedTestItem.completed == True

# TODO: Figure out how to do partial updates
# def test_update_partial():
#     deleteAllRecords()

#     create(TodoItem("Test Create", completed=False))

#     testItem = get_test_item()

#     update(testItem.itemId, TodoItem(completed=True))

#     updatedTestItem = get_test_item()
#     assert updatedTestItem.title == "Test Create"
#     assert updatedTestItem.completed == True
