import { describe, it, expect, beforeAll, afterEach, beforeEach } from "vitest";
import { create, readAll, update, delRecord } from "./crud";
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

  beforeEach(async () => {
    const todoItem: TodoItem = {
      title: faker.lorem.sentence({ min: 3, max: 10 }),
    };

    const newItemId = await create(todoItem);
    await create(todoItem);

    const currentRecord = await getRecord(newItemId);

    expect(currentRecord).toEqual(
      expect.objectContaining({ id: 1, title: todoItem.title, completed: 0 })
    );
  });

  it("updates a given record", async () => {
    const id = 1;

    const resultId = await update(id, {
      title: "Updated Title",
      completed: true,
    });

    const updatedRecord = await getRecord(resultId);

    expect(updatedRecord).toEqual(
      expect.objectContaining({ id: id, title: "Updated Title", completed: 1 })
    );
  });

  it("allows partial updates for records", async () => {
    const id = 1;
    const { title: currentTitle } = await getRecord(id);

    const resultId = await update(id, {
      completed: true,
    });

    const updatedRecord = await getRecord(resultId);

    expect(updatedRecord).toEqual(
      expect.objectContaining({ id: id, title: currentTitle, completed: 1 })
    );

    const resultId2 = await update(id, {
      title: "Updated Title",
    });

    const updatedRecord2 = await getRecord(resultId2);

    expect(updatedRecord2).toEqual(
      expect.objectContaining({ id: id, title: "Updated Title", completed: 1 })
    );
  });
});

describe("delRecord", () => {
  it("should delete a record", async () => {
    deleteAllRecords();

    const todoItem: TodoItem = {
      title: faker.lorem.sentence({ min: 3, max: 10 }),
    };

    const itemId = await create(todoItem);
    await create(todoItem);

    const record = await getRecord(itemId);

    expect(record).toEqual(
      expect.objectContaining({ id: 1, title: todoItem.title, completed: 0 })
    );

    await delRecord(itemId);
    
    const noRecord = await getRecord(itemId);
    expect(noRecord).toBeUndefined();
  });
});
