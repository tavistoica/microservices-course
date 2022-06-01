import { OrderCreatedEvent, OrderStatus, natsWrapper } from "@ostoica/common";
import { OrderCreatedListener } from "../order-created-listener";
import { Meal } from "../../../models/meal.model";
import mongoose from "mongoose";

const setup = async () => {
  //  Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  const meal = new Meal({
    title: "concert",
    price: 20,
    userId: "random",
    stock: 10,
    imagePath: "test",
  });
  await meal.save();

  //    Create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "random",
    expiresAt: "random2",
    meal: {
      id: meal.id,
      price: meal.price,
      stock: meal.stock,
      imagePath: meal.imagePath,
    },
    itemAmount: 10,
  };
  //    @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, meal, data, msg };
};

it("sets the userId of the meal", async () => {
  const { listener, meal, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedMeal = await Meal.findById(meal.id);

  expect(updatedMeal!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, meal, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a meal updated event", async () => {
  const { listener, meal, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const mealUpdatedData = await JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  console.log(data, mealUpdatedData);
  expect(data.id).toEqual(mealUpdatedData.orderId);
});
