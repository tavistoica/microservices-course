import { Publisher, Subjects, MealUpdatedEvent } from "@ostoica/common";

export class MealUpdatedPublisher extends Publisher<MealUpdatedEvent> {
  readonly subject = Subjects.MealUpdated;
}
