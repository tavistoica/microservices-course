import { Subjects, Publisher, PaymentCreatedEvent } from "@ostoica/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
