import express, { Request, Response } from "express";
import { requireAuth } from "@ostoica/common";
import { Order } from "../model/order.model";
import { Ticket } from "../model/ticket.model";

const router = express.Router();

router.delete(
  "/api/orders/",
  requireAuth,
  async (_req: Request, res: Response) => {
    await Order.remove();
    await Ticket.remove();

    res.status(200).send("Removed order and ticket collections");
  }
);

export { router as deleteRouter };
