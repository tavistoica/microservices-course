import { Publisher, OrderCompletedEvent, Subjects } from "@ostoica/common";

export class OrderCompletedPublisher extends Publisher<OrderCompletedEvent> {
  subject: Subjects.OrderCompleted = Subjects.OrderCompleted;
}
