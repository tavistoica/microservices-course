import express, { Request, Response } from "express";
import { requireAuth } from "@ostoica/common";
import { Order } from "../model/order.model";
import { Meal } from "../model/meal.model";
import { logger } from "../utils/logger";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  });

  logger.info(`orders: ${JSON.stringify(orders)}`);

  const mappedOrders = await Promise.all(
    orders.map(async (item) => {
      const meal = await Meal.findById(item.meal);
      if (meal) item.meal = meal;
      return item;
    })
  );

  res.send(mappedOrders);
});

export { router as indexOrderRouter };
