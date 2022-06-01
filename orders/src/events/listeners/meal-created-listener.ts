import { Message } from "node-nats-streaming";
import { Subjects, Listener, MealCreatedEvent } from "@ostoica/common";
import { Meal } from "../../model/meal.model";
import { queueGroupName } from "./queue-group-name";
import { logger } from "../../utils/logger";

export class MealCreatedListener extends Listener<MealCreatedEvent> {
  subject: Subjects.MealCreated = Subjects.MealCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: MealCreatedEvent["data"], msg: Message) {
    logger.info(
      `MealCreatedListener - MealCreatedEvent - data - ${JSON.stringify(
        data
      )} ${data.imagePath}`
    );
    const { id, title, price, stock, userId, imagePath } = data;
    const meal = Meal.build({
      id,
      title,
      price,
      stock,
      userId,
      imagePath,
    });
    logger.info(`MealCreatedListener - meal created - ${JSON.stringify(meal)}`);
    await meal.save();

    msg.ack();
  }
}
