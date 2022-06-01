import request from "supertest";
import { app } from "../../app";
import { Meal } from "../../models/meal.model";
import { natsWrapper } from "@ostoica/common";

it("has a route handler listening to /api/meals for post requests", async () => {
  const response = await request(app).post("/api/meals").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({ title: "", price: 10, stock: 10 })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({ title: "sdfwf", price: -10, stock: 10 })
    .expect(400);

  await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({ title: "fegeg" })
    .expect(400);
});

it("creates a meals with valid inputs", async () => {
  let meals = await Meal.find({});
  expect(meals.length).toEqual(0);

  await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({ title: "sfee", price: 20, stock: 10 })
    .expect(201);

  meals = await Meal.find({});
  expect(meals.length).toEqual(1);
});

it("publishes an event", async () => {
  await request(app)
    .post("/api/meals")
    .set("Cookie", global.signin())
    .send({ title: "sfee", price: 20, stock: 10 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
