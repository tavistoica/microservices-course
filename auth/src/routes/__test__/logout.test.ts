import request from "supertest";
import { app } from "../../app";

describe("POST /logout", () => {
  const mockedUser = {
    email: "test@test.com",
    password: "password",
    role: "Customer",
  };

  it("clears the cookie after signing out", async () => {
    await request(app).post("/api/users/logout").send(mockedUser).expect(204);

    await request(app).post("/api/users/logout").send({}).expect(204);
  });
});
