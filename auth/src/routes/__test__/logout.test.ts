import request from "supertest";
import { app } from "../../app";

const mockedUser = {
  email: "test@test.com",
  password: "password",
  role: "Customer",
};

it("clears the cookie after signing out", async () => {
  await request(app).post("/api/users/logout").send(mockedUser).expect(200);

  const response = await request(app)
    .post("/api/users/logout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
