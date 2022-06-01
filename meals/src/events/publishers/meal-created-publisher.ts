import { Publisher, Subjects, MealCreatedEvent } from "@ostoica/common";

export class MealCreatedPublisher extends Publisher<MealCreatedEvent> {
  readonly subject = Subjects.MealCreated;
}
