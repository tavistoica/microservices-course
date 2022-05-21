import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@ostoica/common";
import { Ticket } from "../../model/ticket.model";
import { queueGroupName } from "./queue-group-name";
import { logger } from "../../utils/logger";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price, stock, userId } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
      stock,
      userId,
    });
    logger.info(
      `TicketCreatedListener - ticket created - ${JSON.stringify(ticket)}`
    );
    await ticket.save();

    msg.ack();
  }
}
