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

const router = express.Router();

router.patch(
  "/api/orders/:orderId/:sellerId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId, sellerId } = req.params;

    const order = await Order.findById(orderId).populate("ticket");
    const ticket = await Ticket.findById(order?.ticket.id);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (sellerId !== ticket?.userId) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Complete;
    await order.save();

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
  }
);

export { router as completeOrderRouter };
