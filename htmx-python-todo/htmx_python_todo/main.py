from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from .crud import create, readAll, update, delRecord


app = FastAPI()
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def main(request: Request):
    todoItems = readAll()
    return templates.TemplateResponse("index.html", dict(request=request, todoItems=todoItems))

@app.post("/create")
def createItem(request: Request):
    print(request.form)
    
    return {"message": "Item created"}