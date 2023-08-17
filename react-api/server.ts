import express, { Request, Response } from "express";

const port = 3000;

const app = express();

type TODO_ITEM = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

const todoList: TODO_ITEM[] = [];

app.get("/", (req: Request, res: Response) => {
  // * Might be a health check or something
  res.send("Hello, world!");
});

app.get("/api", (req: Request, res: Response) => {
  res.send(todoList);
});
app.post("/api", (req: Request, res: Response) => {
  const { title, description } = req.body;
  const todoItem: TODO_ITEM = {
    id: todoList.length,
    title,
    description,
    completed: false,
  };
  todoList.push(todoItem);
  res.send(todoItem);
});

app.put("/api", (req: Request, res: Response) => {
  const { id, title, description, completed } = req.body;
  const todoItem: TODO_ITEM = {
    id,
    title,
    description,
    completed,
  };
  todoList[id] = todoItem;
  res.send(todoItem);
});

app.delete("/api", (req: Request, res: Response) => {
  const { id } = req.body;
  const todoItem: TODO_ITEM = todoList[id];
  todoList.splice(id, 1);
  res.send(todoItem);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
