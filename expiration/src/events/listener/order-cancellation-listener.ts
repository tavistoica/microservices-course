import {
  Listener,
  OrderCancelledEvent,
  Subjects,
  natsWrapper,
} from "@ostoica/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { ExpirationCompletePublisher } from "../publisher/expiration-complete-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const job = await expirationQueue.getJob(data.id);
    if (job) {
      const orderId = job?.data.orderId;

      new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId,
      });
      await job?.remove();
    }

    msg.ack();
  }
}
