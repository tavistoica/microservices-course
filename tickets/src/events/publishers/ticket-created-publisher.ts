import { Publisher, Subjects, TicketCreatedEvent } from "@omstickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
