from typing import Annotated
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from .crud import create, readAll, update, delRecord
from .models import TodoItem


app = FastAPI(default_response_class=HTMLResponse)
templates = Jinja2Templates(directory="templates")


@app.get("/")
def main(request: Request):
    todoItems = readAll()
    return templates.TemplateResponse("index.html", dict(request=request, todoItems=todoItems))


@app.post("/")
def temp(todo: Annotated[str, Form()]):
    newTodo = TodoItem(title=todo)
    # create(newTodo)
    print(f"posted to the wrong route? new todo item: {newTodo}")
    return "<h1>Good night!!!</h1>"


@app.post("/create")
def createItem(todo: Annotated[str, Form()]):
    newTodo = TodoItem(title=todo)
    create(newTodo)
    print(f"created new todo item: {newTodo}")
    return "Happy Birthday!!!"
