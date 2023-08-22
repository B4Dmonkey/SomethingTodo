import { describe, it, expect } from "vitest";
import { connect } from "./db";

describe("Database", () => {
  it("should connect to database", async () => {
    await connect();
    expect(true).toBe(true);
  });
});
