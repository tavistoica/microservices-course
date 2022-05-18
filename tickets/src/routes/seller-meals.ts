import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket.model";

const router = express.Router();

router.get("/api/meals/users/:id", async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find({
      userId: req.params.id,
      stock: { $gt: 0 },
    });
    res.send(tickets);
  } catch (err) {
    res.send([]);
  }
});

export { router as sellerMealsRouter };
