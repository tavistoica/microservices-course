import { Publisher } from "./base-publisher";
import { MealCreatedEvent } from "./meal-created-event";
import { Subjects } from "./subjects";

export class MealCreatedPublisher extends Publisher<MealCreatedEvent> {
  subject: Subjects.MealCreated = Subjects.MealCreated;
}
