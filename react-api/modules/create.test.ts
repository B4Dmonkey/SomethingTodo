import { describe, it } from "vitest";
import supertest = require("supertest");
import app from "../server";

const request = supertest(app);

describe("Create", () => {
  it("Returns 200", async () => {
    await request
      .post("/api")
      .send({ title: "do", description: "the thing" })
      .expect(200);
  });

  it("Adds an item to the db", async () => {
    await request.post("/api").send({ title: "do", description: "the thing" });
  });
});
