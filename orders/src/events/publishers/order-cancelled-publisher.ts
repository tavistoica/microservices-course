import { Publisher, OrderCancelledEvent, Subjects } from "@ostoica/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
