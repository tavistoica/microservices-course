import express, { Request, Response } from "express";
import {
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  CustomRequest,
} from "@ostoica/common";
import { Order } from "../model/order.model";
import { logger } from "../utils/logger";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("meal");
    logger.info(`/api/orders/:orderId - order - ${JSON.stringify(order)}`);

    if (!order) {
      throw new NotFoundError();
    }

    logger.info(
      `/api/orders/:orderId - order.userId: ${order.userId} - req.token!.id - ${
        (req as CustomRequest).token!.id
      }`
    );
    if (order.userId !== (req as CustomRequest).token!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
