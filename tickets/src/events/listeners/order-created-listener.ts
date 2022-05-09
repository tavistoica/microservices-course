import { Listener, OrderCreatedEvent, Subjects } from "@ostoica/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-croup-name";
import { Ticket } from "../../models/ticket.model";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //  Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //  If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    //  Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    //  Save the ticket
    await ticket.save();
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      stock: ticket.stock - data.itemAmount,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    //  ack the message
    msg.ack();
  }
}
