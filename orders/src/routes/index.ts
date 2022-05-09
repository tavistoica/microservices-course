import express, { Request, Response } from "express";
import { requireAuth } from "@ostoica/common";
import { Order } from "../model/order.model";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  });

  res.send(orders);
});

export { router as indexOrderRouter };
