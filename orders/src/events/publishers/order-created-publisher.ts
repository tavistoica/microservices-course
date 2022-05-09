import { Publisher, OrderCreatedEvent, Subjects } from "@ostoica/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
