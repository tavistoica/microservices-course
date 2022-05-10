import { Listener, OrderCancelledEvent, Subjects } from "@ostoica/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-croup-name";
import { Ticket } from "../../models/ticket.model";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    //  Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    //  If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const orderId = ticket.orderId
      ? ticket.orderId.filter((item) => item !== data.id)
      : [];
    ticket.set({ orderId, stock: ticket.stock + data.itemAmount });

    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      stock: ticket.stock + data.itemAmount,
      version: ticket.version,
    });

    msg.ack();
  }
}
