from .db import create_table, get_connection


def seed():
    print("Seeding table")
    create_table()
    with get_connection() as db:
        db.execute(
            "INSERT INTO TODOs (title) VALUES ('Let it rain'), ('Clear it out'), ('Lets get it')")
