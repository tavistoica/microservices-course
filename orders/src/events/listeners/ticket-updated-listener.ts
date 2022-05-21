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
    const test = await Ticket.find();
    logger.info(`all tickets: ${JSON.stringify(test)}`);
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      logger.info(`TicketUpdatedListener - ticket not found`);
      throw new Error("Ticket not found");
    }

    const { title, price, stock } = data;
    ticket.set({ title, price, stock });
    await ticket.save();

    msg.ack();
  }
}
