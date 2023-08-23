import { describe, it, expect } from "vitest";
import { create } from "./crud";
import { TodoItem } from "../models/TodoItem";
import { connect } from "./db";

describe("create", () => {
  it("creates a record", async () => {
    const db = await connect();

    const todoItem: TodoItem = {
      title: "Split in the middle",
    };

    const id = await create(todoItem);

    const lastInsertedRow = await db.get(
      "SELECT * FROM TODOs WHERE id = ?",
      id
    );

    expect(lastInsertedRow).toEqual(
      expect.objectContaining({ title: "Split in the middle", completed: 0 })
    );
  });
});
