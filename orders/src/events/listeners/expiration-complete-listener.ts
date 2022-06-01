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
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      logger.info(`ExpirationCompleteListener - order not found`);
      throw new Error("Order not found");
    }

    if (order.status === OrderStatus.Complete) {
      logger.info(`ExpirationCompleteListener - order.status is complete`);
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
        stock: order.ticket.stock,
        imagePath: order.ticket.imagePath,
      },
      itemAmount: order.itemAmount,
    });
    msg.ack();
  }
}
