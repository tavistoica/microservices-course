import request from "supertest";
import { app } from "../../app";
import { Meal } from "../../model/meal.model";
import mongoose from "mongoose";

it("fetches the order", async () => {
  //  Create meal
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
    userId: "1",
    imagePath: "test",
  });
  await meal.save();

  const user = global.signin();
  //  make a request to build order with the meal
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(201);

  //  make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("it returns an error if a user tries to fetch other user's order", async () => {
  //  Create meal
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
    userId: "1",
    imagePath: "test",
  });
  await meal.save();

  const user = global.signin();
  //  make a request to build order with the meal
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(201);

  //  make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
