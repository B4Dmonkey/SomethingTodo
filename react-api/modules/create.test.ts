import { describe, it } from "vitest";
// import { Request } from "supertest";
import app from "../server";

import supertest = require("supertest");
// import express = require("express");

// const app = express();
const request = supertest(app);

describe("Create", () => {
  it("does the thing", async () => {
    await request
      .post("/api")
      // .send({ title: "do", description: "the thing" })
      .expect(200);
  });
});
