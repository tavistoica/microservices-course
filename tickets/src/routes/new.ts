import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  natsWrapper,
  requireSeller,
} from "@ostoica/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  requireSeller,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be grater than 0"),
    body("stock").isInt({ gt: 0 }).withMessage("Stock must be grater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price, stock } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
      stock,
    });

    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      stock: ticket.stock,
    });

    await ticket.save();

    res.status(201).json(ticket);
  }
);

export { router as createTicketRouter };
