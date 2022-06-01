import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the meal is not found", async () => {
  const id = "60a285f4447a2b2cb7ad0bd8";
  await request(app).get(`/api/meals/${id}`).send().expect(404);
});

it("returns the meal if the meal is found", async () => {
  const title = "concert";
  const price = 50;
  const stock = 10;

  const response = await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({ title, price, stock })
    .expect(201);

  const mealResponse = await request(app)
    .get(`/api/meals/${response.body.id}`)
    .send()
    .expect(200);

  expect(mealResponse.body.title).toEqual(title);
  expect(mealResponse.body.price).toEqual(price);
});
