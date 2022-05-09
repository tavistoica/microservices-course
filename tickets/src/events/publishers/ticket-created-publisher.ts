import { Publisher, Subjects, TicketCreatedEvent } from "@ostoica/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
