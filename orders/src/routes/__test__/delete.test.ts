import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../model/order.model";
import { Meal } from "../../model/meal.model";
import { natsWrapper } from "@ostoica/common";
import mongoose from "mongoose";

it("marks an order as cancelled", async () => {
  //  create meal with meal model
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

  //  make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(201);

  //  make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  //  expectation to make sure the status is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  //  create meal with meal model
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

  //  make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ mealId: meal.id, itemAmount: 10 })
    .expect(201);

  //  make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
