import request from "supertest";
import { connectDB, disconnectDB } from "../data/config/database.js";
import serverApp from "../server-app.js";

// needs update, not working
beforeAll(async () => {
  await connectDB(); // Ensure MongoDB is connected before tests
});
afterAll(async () => {
  await disconnectDB(); // Disconnect MongoDB after tests
});

describe("API Endpoints", () => {
  it("should return a welcome message for GET /", async () => {
    const res = await request(serverApp).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("Welcome to the Backend API!");
  });

  it("should return example data for GET /api/users", async () => {
    const res = await request(serverApp).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "This is an example API response!" });
  });
});
