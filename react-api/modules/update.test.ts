import { describe, it } from "vitest";
import supertest = require("supertest");
import app from "../server";

const request = supertest(app);

describe("Update", () => {
  it("Returns 200", async () => {
    const toDoItemID = 1;
    await request
      .put(`/api/${toDoItemID}`)
      .send({ completed: true })
      .expect(200);
  });
});
