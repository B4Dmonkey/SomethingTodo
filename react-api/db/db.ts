import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DATABASE_FILE = './TODO_DATABASE.db';

export async function connect() {
  return open({
    filename: DATABASE_FILE,
    driver: sqlite3.Database
  });
}