import { Listener, OrderCreatedEvent, Subjects } from "@ostoica/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-croup-name";
import { Ticket } from "../../models/ticket.model";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { logger } from "../../utils/logger";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //  Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    logger.info(`OrderCreatedEvent - ticket version 1 - ${ticket?.version}`);
    logger.info(`OrderCreatedEvent - ticket - ${JSON.stringify(ticket)}`);

    //  If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    if (ticket.stock - data.itemAmount < 0) {
      throw new Error("Ticket stock is too low");
    }

    //  Mark the ticket as being reserved by setting its orderId property
    const orderId = ticket.orderId ? ticket.orderId.push(data.id) : [data.id];
    logger.info(
      `OrderCreatedEvent - orderId - ${JSON.stringify(orderId)} - stock - ${
        ticket.stock - data.itemAmount
      }`
    );

    ticket.set({ orderId, stock: ticket.stock - data.itemAmount });

    //  Save the ticket
    await ticket.save();
    logger.info(`OrderCreatedEvent - ticket version 2 - ${ticket.version}`);
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      stock: ticket.stock,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    //  ack the message
    msg.ack();
  }
}
