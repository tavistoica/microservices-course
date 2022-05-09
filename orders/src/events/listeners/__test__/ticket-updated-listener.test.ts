import Message from "node-nats-streaming";
import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@ostoica/common";
import { natsWrapper } from "@ostoica/common";
import { Ticket } from "../../../model/ticket.model";
import { TicketUpdatedListener } from "../ticket-updated-listener";

const setup = async () => {
  //  create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  //  create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
    stock: 10,
  });

  await ticket.save();

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new title",
    price: 1000,
    userId: new mongoose.Types.ObjectId().toHexString(),
    stock: 10,
  };
  //  create a fake message object
  //  @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg, ticket };
};

it("finds, updates and saves a ticket", async () => {
  const { listener, data, msg, ticket } = await setup();
  //  call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  //  write assertions to make sure a ticket was created
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { data, listener, msg } = await setup();
  //  call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  //  write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  const { msg, data, listener, ticket } = await setup();
  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (err) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
