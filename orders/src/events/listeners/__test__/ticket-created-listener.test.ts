import Message from "node-nats-streaming";
import mongoose from "mongoose";
import { MealCreatedEvent } from "@ostoica/common";
import { MealCreatedListener } from "../meal-created-listener";
import { natsWrapper } from "@ostoica/common";
import { Meal } from "../../../model/meal.model";

const setup = async () => {
  //  create an instance of the listener
  const listener = new MealCreatedListener(natsWrapper.client);
  //  create a fake data event
  const data: MealCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
    stock: 10,
    imagePath: "test",
  };
  //  create a fake message object
  //  @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};

it("creates and saves a meal", async () => {
  const { listener, data, msg } = await setup();
  //  call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  //  write assertions to make sure a meal was created
  const meal = await Meal.findById(data.id);
  expect(meal).toBeDefined();
  expect(meal!.title).toEqual(data.title);
  expect(meal!.price).toEqual(data.price);
});

it("acks the message", async () => {
  const { data, listener, msg } = await setup();
  //  call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  //  write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
