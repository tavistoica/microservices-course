import { OrderCancelledListener } from "../order-cancelled-listener";
import { Meal } from "../../../models/meal.model";
import mongoose from "mongoose";
import { OrderCancelledEvent, natsWrapper } from "@ostoica/common";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
  const meal = Meal.build({
    title: "concert",
    price: 20,
    userId: "random",
    stock: 10,
    imagePath: "test",
  });
  meal.set({ orderId });
  await meal.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    meal: {
      id: meal.id,
      stock: meal.stock,
      imagePath: meal.imagePath,
    },
    itemAmount: 10,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { msg, data, meal, orderId, listener };
};

it("updateds the meal, publishes an event, and acks the message", async () => {
  const { msg, data, meal, orderId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedMeal = await Meal.findById(meal.id);
  expect(updatedMeal!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
