import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { create, readAll, update } from "./crud";
import { TodoItem } from "../models/TodoItem";
import { connect } from "./db";
import { faker } from "@faker-js/faker";

const deleteAllRecords = async () => {
  const db = await connect();
  await db.run("DELETE FROM TODOs");
};

const getRecord = async (id: number) => {
  const db = await connect();
  return await db.get("SELECT * FROM TODOs WHERE id = ?", id);
};

describe("create", () => {
  beforeAll(() => {
    deleteAllRecords();
  });

  afterEach(() => {
    deleteAllRecords();
  });

  it("creates a record", async () => {
    const todoItem: TodoItem = {
      title: "Split in the middle",
    };

    const id = await create(todoItem);

    const lastInsertedRow = await getRecord(id);

    expect(lastInsertedRow).toEqual(
      expect.objectContaining({ title: "Split in the middle", completed: 0 })
    );
  });
});

describe("readAll", () => {
  beforeAll(async () => {
    await deleteAllRecords();
  });

  afterEach(() => {
    deleteAllRecords();
  });

  it("returns all records", async () => {
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
  beforeAll(() => {
    deleteAllRecords();
  });

  afterEach(() => {
    deleteAllRecords();
  });

  it("updates a given record", async () => {
    const todoItem: TodoItem = {
      title: faker.lorem.sentence({ min: 3, max: 10 }),
    };

    const newItemId = await create(todoItem);

    const currentRecord = await getRecord(newItemId);

    const id = 1;

    expect(currentRecord).toEqual(
      expect.objectContaining({ id: id, title: todoItem.title, completed: 0 })
    );

    const resultId = await update(id, {
      title: "Updated Title",
      completed: true,
    });

    const updatedRecord = await getRecord(resultId);

    expect(updatedRecord).toEqual(
      expect.objectContaining({ id: id, title: "Updated Title", completed: 1 })
    );
  });
});
