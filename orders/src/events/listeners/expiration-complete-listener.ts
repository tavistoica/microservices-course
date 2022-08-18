import {
  ExpirationCompleteEvent,
  Listener,
  Subjects,
  OrderStatus,
} from "@ostoica/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order.model";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { logger } from "../../utils/logger";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("meal");

    if (!order) {
      logger.info(`ExpirationCompleteListener - order not found`);
      throw new Error("Order not found");
    }

    if (order.status === OrderStatus.Complete) {
      logger.info(`ExpirationCompleteListener - order.status is complete`);
      return msg.ack();
    }

    logger.info(`Order cancelled - id - ${order.id} - user =${order.userId}`);

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      meal: {
        id: order.meal.id,
        stock: order.meal.stock,
        imagePath: order.meal.imagePath,
      },
      itemAmount: order.itemAmount,
    });
    msg.ack();
  }
}
