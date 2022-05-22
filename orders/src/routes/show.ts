import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@ostoica/common";
import { Order } from "../model/order.model";
import { logger } from "../utils/logger";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");
    logger.info(`/api/orders/:orderId - order - ${JSON.stringify(order)}`);

    if (!order) {
      throw new NotFoundError();
    }

    logger.info(
      `/api/orders/:orderId - order.userId: ${
        order.userId
      } - req.currentUser!.id - ${req.currentUser!.id}`
    );
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
