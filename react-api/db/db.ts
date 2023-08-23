import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

const DATABASE_FILE = "./TODO_DATABASE.db";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function connect() {
  if (!db)
    db = await open({
      filename: DATABASE_FILE,
      driver: sqlite3.cached.Database,
    });
  return db;
}

export async function createTable() {
  // * In a normal workflow you would opt for migrations instead.
  // * This is because the shape of the table might change durning development.
  const db = await connect();

  const hasTODOTable = await db.get(`
      SELECT name FROM sqlite_master WHERE type='table' AND name='TODOs'
    `);

  if (hasTODOTable) return;

  await db.exec(`
    CREATE TABLE TODOs (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )
  `);
}
