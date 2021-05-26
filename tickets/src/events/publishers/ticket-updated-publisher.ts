import { Publisher, Subjects, TicketUpdatedEvent } from "@omstickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
