import express, { Request, Response } from "express";
import {
  NotFoundError,
  NotEnoughStock,
  requireAuth,
  validateRequest,
  OrderStatus,
  BadRequestError,
  natsWrapper,
} from "@ostoica/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../model/ticket.model";
import { Order } from "../model/order.model";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 5 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
    body("itemAmount")
      .isInt({ gt: 0 })
      .withMessage("Stock must be grater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId, itemAmount } = req.body;
    //  Find ticket the user is trying to order
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.stock < itemAmount) {
      throw new NotEnoughStock();
    }

    if (ticket.stock === 0) {
      throw new BadRequestError("Ticket is no longer available");
    }

    //  Make sure the ticket is not already reserved
    // const isReserved = await ticket.isReserved();
    // if (isReserved) {
    //   throw new BadRequestError("Ticket is already reserved");
    // }

    //  Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    //  Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
      itemAmount,
    });

    await order.save();

    //  Publish an event saying that the order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
        stock: ticket.stock,
      },
      itemAmount,
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
