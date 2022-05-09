import { Publisher, Subjects, TicketUpdatedEvent } from "@ostoica/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
