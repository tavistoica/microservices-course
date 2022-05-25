import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@ostoica/common";
import { Order, OrderStatus } from "../model/order.model";
import { Ticket } from "../model/ticket.model";
import { OrderCompletedPublisher } from "../events/publishers/order-completed-publisher";
import { natsWrapper } from "@ostoica/common";
import { logger } from "../utils/logger";

const router = express.Router();
const endpointPath = "/api/orders/:orderId/:sellerId";

router.patch(endpointPath, requireAuth, async (req: Request, res: Response) => {
  const { orderId, sellerId } = req.params;
  logger.info(`${endpointPath} - orderId = ${orderId}, sellerId = ${sellerId}`);

  const order = await Order.findById(orderId).populate("ticket");
  logger.info(`${endpointPath} - order obj - ${JSON.stringify(order)}`);
  const ticket = await Ticket.findById(order?.ticket.id);
  logger.info(`${endpointPath} - ticket obj - ${JSON.stringify(ticket)}`);

  if (!order) {
    logger.info(`${endpointPath} - order not found`);
    throw new NotFoundError();
  }

  if (sellerId !== ticket?.userId) {
    logger.info(
      `${endpointPath} - sellerId !== ticket.userId - ${ticket?.userId}`
    );
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Complete;
  await order.save();
  logger.info(`${endpointPath} - order completed`);

  //  publish an event saying it was completed
  new OrderCompletedPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
      stock: order.ticket.stock,
    },
    itemAmount: order.ticket.stock,
  });

  res.status(204).send(order);
});

export { router as completeOrderRouter };
