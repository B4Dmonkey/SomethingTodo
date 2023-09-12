from .db import create_table
from htmx_python_todo.crud import create

def seed():
    print("Seeding table")
    create_table()
    create("Let it Rain")
    create("Clear it out")
    create("Lets get it")
