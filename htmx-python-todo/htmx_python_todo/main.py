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


@app.post("/create")
def createItem(todo: Annotated[str, Form()], request: Request):
    newTodo = TodoItem(title=todo)
    create(newTodo)
    todoItems = readAll()
    return templates.TemplateResponse("listItems.html", dict(request=request, todoItems=todoItems))
