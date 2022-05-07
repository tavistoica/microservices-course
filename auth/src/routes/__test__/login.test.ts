import request from "supertest";
import { app } from "../../app";

const mockedUser = {
  email: "test@test.com",
  password: "password",
};

it("fails with code 400 when the supplied email does not exist", async () => {
  await request(app).post("/api/users/login").send(mockedUser).expect(400);
});

it("fails with code 400 when the supplied password is not correct", async () => {
  await request(app).post("/api/users/register").send(mockedUser).expect(201);
  await request(app)
    .post("/api/users/login")
    .send({ ...mockedUser, password: "123" })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app).post("/api/users/register").send(mockedUser).expect(201);
  const response = await request(app)
    .post("/api/users/login")
    .send(mockedUser)
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
