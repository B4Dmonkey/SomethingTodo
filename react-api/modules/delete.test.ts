import { describe, it } from "vitest";
import supertest = require("supertest");
import app from "../server";

const request = supertest(app);

describe("Delete", () => {
  it("should Return 204", async () => {
    await request.delete("/api/1").expect(204);
  });
});
