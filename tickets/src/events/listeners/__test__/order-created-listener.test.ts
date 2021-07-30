import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedEvent, OrderStatus } from "@omstickets/common";
import { OrderCreatedListener } from "../order-created-listener";
import { Ticket } from "../../../models/ticket.model";
import mongoose from "mongoose";

const setup = async () => {
  //  Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = new Ticket({
    title: "concert",
    price: 20,
    userId: "random",
  });
  await ticket.save();

  //    Create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "random",
    expiresAt: "random2",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  //    @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("sets the userId of the ticket", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = await JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  console.log(data, ticketUpdatedData);
  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
