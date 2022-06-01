import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Meal } from "../../models/meal.model";
import { natsWrapper } from "@ostoica/common";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/meals/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/meals/${id}`)
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(401);
});

it("returns a 401 if the user does not own the meal", async () => {
  const response = await request(app)
    .post(`/api/meals/`)
    .set("Cookie", global.signin())
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(201);

  await request(app)
    .put(`/api/meals/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "random",
      price: 40,
      stock: 10,
      imagePath: "test",
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/meals/`)
    .set("Cookie", cookie)
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(201);

  await request(app)
    .put(`/api/meals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(400);

  await request(app)
    .put(`/api/meals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "tetete",
      price: -1,
      stock: 10,
      imagePath: "test",
    })
    .expect(400);
});

it("updates the meal provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/meals/`)
    .set("Cookie", cookie)
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(201);

  await request(app)
    .put(`/api/meals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "random22",
      price: 50,
      stock: 10,
      imagePath: "test",
    })
    .expect(200);

  const mealResponse = await request(app)
    .get(`/api/meals/${response.body.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(mealResponse.body.title).toEqual("random22");
  expect(mealResponse.body.price).toEqual(50);
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/meals/`)
    .set("Cookie", cookie)
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    })
    .expect(201);

  await request(app)
    .put(`/api/meals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "random22",
      price: 50,
      stock: 10,
      imagePath: "test",
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if the meal is reserved", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/meals/`)
    .set("Cookie", cookie)
    .send({
      title: "fegeg",
      price: 20,
      stock: 10,
      imagePath: "test",
    });

  const meal = await Meal.findById(response.body.id);
  meal!.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await meal!.save();

  await request(app)
    .put(`/api/meals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "random22",
      price: 50,
      stock: 10,
      imagePath: "test",
    })
    .expect(400);
});
