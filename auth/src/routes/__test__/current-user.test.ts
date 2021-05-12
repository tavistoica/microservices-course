import request from "supertest";
import { app } from "../../app";

const mockedUser = {
  email: "test@test.com",
  password: "password",
};

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual(mockedUser.email);
});

it("return an empty object if the user is not logged in", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
