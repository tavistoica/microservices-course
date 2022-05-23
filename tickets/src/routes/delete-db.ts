import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket.model";

const router = express.Router();

router.delete("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.remove();

  res.send("Removed tickets collection");
});

export { router as deleteRouter };
