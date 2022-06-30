import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@ostoica/common";
import { Order, OrderStatus } from "../model/order.model";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "@ostoica/common";

const router = express.Router();

router.patch(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("meal");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //  publish an event saying it was cancelled
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      meal: {
        id: order.meal.id,
        stock: order.meal.stock,
        imagePath: order.meal.imagePath,
      },
      itemAmount: order.itemAmount,
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
