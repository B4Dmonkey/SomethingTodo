import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { create, readAll, update } from "./crud";
import { TodoItem } from "../models/TodoItem";
import { connect } from "./db";
import { faker } from "@faker-js/faker";

const deleteAllRecords = async () => {
  const db = await connect();
  await db.run("DELETE FROM TODOs");
};

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
  beforeAll(async () => {
    await deleteAllRecords();
  });

  it.only("returns all records", async () => {
    const results = await readAll();
    expect(results.length).toBe(0);

    const todoItem: TodoItem = {
      title: faker.lorem.sentence({ min: 3, max: 10 }),
    };

    await create(todoItem);
  
    const results2 = await readAll();
    expect(results2.length).toBe(1);
  });
});

describe("update", () => {
  it("updates a given recon", async () => {
    const result = await update({ title: "Updated title" });
  });
});
