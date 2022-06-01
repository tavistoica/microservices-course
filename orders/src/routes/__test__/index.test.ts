import request from "supertest";
import { app } from "../../app";
import { Meal } from "../../model/meal.model";
import mongoose from "mongoose";

const buildMeal = async () => {
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
    userId: "1",
    imagePath: "test",
  });
  await meal.save();

  return meal;
};

it("fetches orders for a particular user", async () => {
  //  Create three meals
  const mealOne = await buildMeal();
  const mealTwo = await buildMeal();
  const mealTree = await buildMeal();

  const userOne = global.signin();
  const userTwo = global.signin();

  //  Create one order as User #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ mealId: mealOne.id, itemAmount: 10 })
    .expect(201);

  //  Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ mealId: mealTwo.id, itemAmount: 10 })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ mealId: mealTree.id, itemAmount: 10 })
    .expect(201);

  //  Make request to get orders for User #2
  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  //  Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
});
