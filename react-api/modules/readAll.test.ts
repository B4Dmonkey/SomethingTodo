import { describe, it, expect } from "vitest";
import supertest = require("supertest");
import app from "../server";

const request = supertest(app);

describe('Read All', () => {
  it('Returns 200', async () => {
    await request
      .get('/api')
      .expect(200);
  });

  it('Returns an array of items', async () => {
    const response = await request.get('/api');
    expect(response.body).toBeInstanceOf(Array);
  });
});