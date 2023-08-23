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
