import { Subjects } from "./subjects";

export interface MealCreatedEvent {
  subject: Subjects.MealCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
