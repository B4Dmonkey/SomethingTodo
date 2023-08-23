import { describe, it, expect } from "vitest";
import { connect, createTable } from "./db";

describe("Database", () => {
  it("should connect to database", async () => {
    const db = await connect();
    expect(db).toBeDefined();
  });

  it("makes a table", async () => {
    const db = await connect();
    await createTable();
    const hasTable = await db.get(`
      SELECT name FROM sqlite_master WHERE type='table' AND name='TODOs'
    `);
    expect(hasTable).toBeDefined();
  });
});
