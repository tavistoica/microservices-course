import { Listener, OrderCreatedEvent, Subjects } from "@ostoica/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-croup-name";
import { Meal } from "../../models/meal.model";
import { MealUpdatedPublisher } from "../publishers/meal-updated-publisher";
import { logger } from "../../utils/logger";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //  Find the meal that the order is reserving
    const meal = await Meal.findById(data.meal.id);
    logger.info(`OrderCreatedEvent - meal version 1 - ${meal?.version}`);
    logger.info(`OrderCreatedEvent - meal - ${JSON.stringify(meal)}`);

    //  If no meal, throw error
    if (!meal) {
      throw new Error("Meal not found");
    }

    if (meal.stock - data.itemAmount < 0) {
      throw new Error("Meal stock is too low");
    }

    //  Mark the meal as being reserved by setting its orderId property
    const orderId = meal.orderId ? meal.orderId.push(data.id) : [data.id];
    logger.info(
      `OrderCreatedEvent - orderId - ${JSON.stringify(orderId)} - stock - ${
        meal.stock - data.itemAmount
      }`
    );

    meal.set({ orderId, stock: meal.stock - data.itemAmount });

    //  Save the meal
    await meal.save();
    logger.info(`OrderCreatedEvent - meal version 2 - ${meal.version}`);
    new MealUpdatedPublisher(this.client).publish({
      id: meal.id,
      version: meal.version,
      title: meal.title,
      price: meal.price,
      stock: meal.stock,
      userId: meal.userId,
      orderId: meal.orderId,
      imagePath: meal.imagePath,
    });

    //  ack the message
    msg.ack();
  }
}
