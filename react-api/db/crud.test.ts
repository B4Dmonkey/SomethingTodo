import { describe, it, expect } from "vitest";
import { create, readAll, update } from "./crud";
import { TodoItem } from "../models/TodoItem";
import { connect } from "./db";

describe("create", () => {
  it("creates a record", async () => {
    const todoItem: TodoItem = {
      title: "Split in the middle",
    };

    const id = await create(todoItem);

    const db = await connect();

    const lastInsertedRow = await db.get(
      "SELECT * FROM TODOs WHERE id = ?",
      id
    );

    expect(lastInsertedRow).toEqual(
      expect.objectContaining({ title: "Split in the middle", completed: 0 })
    );
  });
});

describe("readAll", () => {
  it("returns all records", async () => {
    const results = await readAll();

    console.log(results);
    // ? whats the correct expectation here?
  });
});

describe("update", () => {
  it("updates a given recon", async () => {
    const result = await update( { title: "Updated title" });
  });
});
