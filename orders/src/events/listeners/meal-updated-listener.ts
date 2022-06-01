import { Message } from "node-nats-streaming";
import { Subjects, Listener, MealUpdatedEvent } from "@ostoica/common";
import { queueGroupName } from "./queue-group-name";
import { Meal, MealDoc } from "../../model/meal.model";
import { logger } from "../../utils/logger";

export class MealUpdatedListener extends Listener<MealUpdatedEvent> {
  subject: Subjects.MealUpdated = Subjects.MealUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: MealUpdatedEvent["data"], msg: Message) {
    logger.info(`meal updated data: ${JSON.stringify(data)}`);
    let meal: MealDoc | null = null;
    try {
      meal = await Meal.findByEvent(data);
    } catch (err) {
      console.log("err", err);
    }
    logger.info(`MealUpdatedListener - meal - ${JSON.stringify(meal)}`);

    if (!meal) {
      logger.error(`MealUpdatedListener - meal not found`);
      msg.ack();
      return;
      // throw new Error("Meal not found");
    }

    const { title, price, stock, imagePath } = data;
    meal.set({ title, price, stock, imagePath });
    await meal.save();
    logger.info("MealUpdatedListener - finished");

    msg.ack();
  }
}
