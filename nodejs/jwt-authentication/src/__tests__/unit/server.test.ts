import supertest from "supertest";
import { createServer } from "../../server";

describe("server", () => {
  const server = createServer();
  const request = supertest(server);

  it("should return 200 for the health check endpoint", async () => {
    const res = await request.get("/api/v1/health").expect(200);
    expect(res.body.ok).toBe(true);
  });

  it("should return a greeting message for the message endpoint", async () => {
    const res = await request.get("/api/v1/health/message/jared").expect(200);
    expect(res.body).toEqual({ message: "hello jared" });
  });
});
