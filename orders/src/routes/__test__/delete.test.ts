import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../model/order.model";
import { Ticket } from "../../model/ticket.model";
import { natsWrapper } from "@ostoica/common";
import mongoose from "mongoose";

it("marks an order as cancelled", async () => {
  //  create ticket with ticket model
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
  });
  await ticket.save();

  const user = global.signin();

  //  make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id, itemAmount: 10 })
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
  //  create ticket with ticket model
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
    stock: 10,
  });
  await ticket.save();

  const user = global.signin();

  //  make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id, itemAmount: 10 })
    .expect(201);

  //  make a request to cancel the order
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
