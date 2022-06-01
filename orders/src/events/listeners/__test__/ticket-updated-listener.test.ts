import Message from "node-nats-streaming";
import mongoose from "mongoose";
import { MealUpdatedEvent } from "@ostoica/common";
import { natsWrapper } from "@ostoica/common";
import { Meal } from "../../../model/meal.model";
import { MealUpdatedListener } from "../meal-updated-listener";

const setup = async () => {
  //  create an instance of the listener
  const listener = new MealUpdatedListener(natsWrapper.client);
  const userId = new mongoose.Types.ObjectId().toHexString();
  //  create and save a meal
  const meal = Meal.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
    stock: 10,
    userId,
    imagePath: "test",
  });

  await meal.save();

  const data: MealUpdatedEvent["data"] = {
    id: meal.id,
    version: meal.version + 1,
    title: "new title",
    price: 1000,
    userId,
    stock: 10,
    imagePath: "test",
  };
  //  create a fake message object
  //  @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, meal };
};

it("finds, updates and saves a meal", async () => {
  const { listener, data, msg, meal } = await setup();
  //  call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  //  write assertions to make sure a meal was created
  const updatedMeal = await Meal.findById(meal.id);
  expect(updatedMeal!.title).toEqual(data.title);
  expect(updatedMeal!.price).toEqual(data.price);
  expect(updatedMeal!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { data, listener, msg } = await setup();
  //  call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  //  write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  const { msg, data, listener, meal } = await setup();
  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
