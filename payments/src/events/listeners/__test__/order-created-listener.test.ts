import { OrderCreatedEvent, OrderStatus } from "@ostoica/common";
import mongoose from "mongoose";
import { natsWrapper } from "@ostoica/common";
import { OrderCreatedListener } from "../order-created-listener";
import { Order } from "../../../model/order.model";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: "random",
    userId: "string",
    status: OrderStatus.Created,
    ticket: {
      id: "random",
      price: 20,
      stock: 10,
    },
    itemAmount: 10,
  };

  //    @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("replicates the order info", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
