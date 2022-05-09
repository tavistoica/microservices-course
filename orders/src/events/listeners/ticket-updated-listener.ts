import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@ostoica/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../model/ticket.model";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price, stock } = data;
    ticket.set({ title, price, stock });
    await ticket.save();

    msg.ack();
  }
}
