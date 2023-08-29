import { TodoItem } from "../models/TodoItem";
import { connect } from "./db";

export async function create(todoItem: TodoItem): Promise<number> {
  const db = await connect();

  const stmt = await db.prepare(
    "INSERT INTO TODOs (title, completed) VALUES (?, ?)"
  );

  const result = await stmt.run(todoItem.title, todoItem.completed ? 1 : 0);

  const { lastID } = result;

  if (!lastID) throw new Error("Could not create record");

  await stmt.finalize();

  return lastID;
}

export async function readAll(): Promise<TodoItem[]> {
  const db = await connect();

  const results = await db.all("SELECT * FROM TODOs");

  return results.map(
    (result): TodoItem => ({
      id: result.id,
      title: result.title,
      completed: result.completed === 1,
    })
  );
}

export async function update(id: number, todo: TodoItem): Promise<number> {
  const db = await connect();

  const stmt = await db.prepare(
    "UPDATE TODOs SET title = ?, completed = ? WHERE id = ?"
  );

  const result = await stmt.run(todo.title, todo.completed ? 1 : 0, id);

  const { lastID } = result;

  if (!lastID) throw new Error("Could not create record");

  await stmt.finalize();

  return lastID;
}
