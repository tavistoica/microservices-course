import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@ostoica/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../model/ticket.model";
import { logger } from "../../utils/logger";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    logger.info(`ticket updated data: ${JSON.stringify(data)}`);
    const ticket = await Ticket.findById(data.id);
    logger.info(`TicketUpdatedListener - ticket - ${JSON.stringify(ticket)}`);

    if (!ticket) {
      logger.error(`TicketUpdatedListener - ticket not found`);
      msg.ack();
      throw new Error("Ticket not found");
    }

    if (ticket.stock - data.stock < 0) {
      logger.error("ticket.stock - data.stock < 0");
      return;
    }

    const { title, price, stock } = data;
    ticket.set({ title, price, stock });
    await ticket.save();
    logger.info("TicketUpdatedListener - finished");

    msg.ack();
  }
}
