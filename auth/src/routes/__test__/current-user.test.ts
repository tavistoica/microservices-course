import request from "supertest";
import { app } from "../../app";

describe("GET /current-user", () => {
  const mockedUser = {
    email: "test@test.com",
    password: "password",
    role: "Customer",
  };

  it("responds with details about the current user", async () => {
    const tokens = await global.signin();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("authorization", tokens.accessToken);

    expect(response.body.currentUser.email).toEqual(mockedUser.email);
  });

  it("return an empty object if the user is not logged in", async () => {
    await request(app).get("/api/users/currentuser").expect(403);
  });
});
