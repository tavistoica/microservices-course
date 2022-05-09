import { Publisher, ExpirationCompleteEvent, Subjects } from "@ostoica/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
