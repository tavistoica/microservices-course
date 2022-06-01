import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { MealCreatedEvent } from "./meal-created-event";

export class MealCreatedListener extends Listener<MealCreatedEvent> {
  readonly subject = Subjects.MealCreated;
  queueGroupName = "payments-service";

  onMessage(data: MealCreatedEvent["data"], msg: Message) {
    console.log("Event data", data);

    console.log(data.price);

    msg.ack();
  }
}
