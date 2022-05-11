import express, { Request, Response } from "express";
import { requireAuth } from "@ostoica/common";
import { Order } from "../model/order.model";
import { Ticket } from "../model/ticket.model";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  });

  const mappedOrders = orders.map(async (item) => {
    const ticket = await Ticket.findById(item.ticket);
    if (ticket) item.ticket = ticket;
    return item;
  });

  // const response = orders.map(async (item) => {
  //   console.log("item", item);
  //   const ticket = await Ticket.find({ id: item.ticket.id });
  //   return { ...item, ticket };
  // });

  res.send(mappedOrders);
});

export { router as indexOrderRouter };
