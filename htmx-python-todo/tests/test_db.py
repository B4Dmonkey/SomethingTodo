from htmx_python_todo.db.db import create_table, get_connection


def test_create_table():
    print("running test_create_table")
    create_table()
    with get_connection() as cursor:
        tableCreated = cursor.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='TODOs'"
        ).fetchone()
        assert tableCreated is not None
