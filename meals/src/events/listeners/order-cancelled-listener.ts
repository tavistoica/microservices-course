import { Listener, OrderCancelledEvent, Subjects } from "@ostoica/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-croup-name";
import { Meal } from "../../models/meal.model";
import { MealUpdatedPublisher } from "../publishers/meal-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    //  Find the meal that the order is reserving
    const meal = await Meal.findById(data.meal.id);

    //  If no meal, throw error
    if (!meal) {
      throw new Error("Meal not found");
    }

    const orderId = meal.orderId
      ? meal.orderId.filter((item) => item !== data.id)
      : [];
    meal.set({ orderId, stock: meal.stock + data.itemAmount });

    await meal.save();
    await new MealUpdatedPublisher(this.client).publish({
      id: meal.id,
      orderId: meal.orderId,
      userId: meal.userId,
      price: meal.price,
      title: meal.title,
      stock: meal.stock + data.itemAmount,
      version: meal.version,
      imagePath: meal.imagePath,
    });

    msg.ack();
  }
}
