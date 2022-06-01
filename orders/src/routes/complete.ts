import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@ostoica/common";
import { Order, OrderStatus } from "../model/order.model";
import { Meal } from "../model/meal.model";
import { OrderCompletedPublisher } from "../events/publishers/order-completed-publisher";
import { natsWrapper } from "@ostoica/common";
import { logger } from "../utils/logger";

const router = express.Router();
const endpointPath = "/api/orders/:orderId/:sellerId";

router.patch(endpointPath, requireAuth, async (req: Request, res: Response) => {
  const { orderId, sellerId } = req.params;
  logger.info(`${endpointPath} - orderId = ${orderId}, sellerId = ${sellerId}`);

  const order = await Order.findById(orderId).populate("meal");
  logger.info(`${endpointPath} - order obj - ${JSON.stringify(order)}`);
  const meal = await Meal.findById(order?.meal.id);
  logger.info(`${endpointPath} - meal obj - ${JSON.stringify(meal)}`);

  if (!order) {
    logger.info(`${endpointPath} - order not found`);
    throw new NotFoundError();
  }

  if (sellerId !== meal?.userId) {
    logger.info(`${endpointPath} - sellerId !== meal.userId - ${meal?.userId}`);
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Complete;
  await order.save();
  logger.info(`${endpointPath} - order completed`);

  //  publish an event saying it was completed
  new OrderCompletedPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    meal: {
      id: order.meal.id,
      stock: order.meal.stock,
      imagePath: order.meal.imagePath,
    },
    itemAmount: order.meal.stock,
  });

  res.send(order);
});

export { router as completeOrderRouter };
