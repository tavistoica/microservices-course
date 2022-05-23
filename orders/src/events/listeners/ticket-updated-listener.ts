import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@ostoica/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket, TicketDoc } from "../../model/ticket.model";
import { logger } from "../../utils/logger";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    logger.info(`ticket updated data: ${JSON.stringify(data)}`);
    let ticket: TicketDoc | null = null;
    try {
      ticket = await Ticket.findByEvent(data);
    } catch (err) {
      console.log("err", err);
    }
    logger.info(`TicketUpdatedListener - ticket - ${JSON.stringify(ticket)}`);

    if (!ticket) {
      logger.error(`TicketUpdatedListener - ticket not found`);
      msg.ack();
      throw new Error("Ticket not found");
    }

    const { title, price, stock } = data;
    ticket.set({ title, price, stock });
    await ticket.save();
    logger.info("TicketUpdatedListener - finished");

    msg.ack();
  }
}
