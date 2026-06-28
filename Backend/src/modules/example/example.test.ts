import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";
import { exampleRoutes } from "./example.routes";

describe("Example API", () => {
  const app = new Elysia().use(exampleRoutes);

  it("should return 200 on GET /examples", async () => {
    const response = await app.handle(new Request("http://localhost/examples"));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
