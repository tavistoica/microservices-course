import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Meal } from "../../model/meal.model";
import { natsWrapper } from "@ostoica/common";

it("returns an error if the meal does not exist", async () => {
  const mealId = mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ mealId, itemAmount: 10 })
    .expect(404);
});

it("returns an error if the meal has stock 0", async () => {
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 0,
    userId: "1",
    imagePath: "test",
  });
  await meal.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(400);
});

it("reserves a meal", async () => {
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
    userId: "1",
    imagePath: "test",
  });
  await meal.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(201);
});

it("emits an order created event", async () => {
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
    userId: "1",
    imagePath: "test",
  });
  await meal.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
