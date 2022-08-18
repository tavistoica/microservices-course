import express, { Request, Response } from "express";
import {
  NotFoundError,
  NotEnoughStock,
  requireUser,
  validateRequest,
  OrderStatus,
  BadRequestError,
  natsWrapper,
  CustomRequest,
} from "@ostoica/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Meal } from "../model/meal.model";
import { Order } from "../model/order.model";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { logger } from "../utils/logger";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 60 * 60 * 24;

router.post(
  "/api/orders",
  requireUser,
  [
    body("mealId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("mealId must be provided"),
    body("itemAmount")
      .isInt({ gt: 0 })
      .withMessage("Stock must be grater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { mealId, itemAmount } = req.body;
    //  Find meal the user is trying to order
    const meal = await Meal.findById(mealId);
    logger.info(`POST /api/orders - meal - ${JSON.stringify(meal)}`);

    if (!meal) {
      throw new NotFoundError();
    }

    if (meal.stock < itemAmount) {
      throw new NotEnoughStock();
    }

    if (meal.stock === 0 || itemAmount === 0) {
      throw new BadRequestError("meal is no longer available");
    }

    //  Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    console.log("new order with userId: ", (req as CustomRequest).token!.id);

    //  Build the order and save it to the database
    const order = Order.build({
      userId: (req as CustomRequest).token!.id,
      status: OrderStatus.Pending,
      expiresAt: expiration,
      meal,
      itemAmount,
    });

    await order.save();

    logger.info(`new order has expiration time: ${order.expiresAt}`);

    //  Publish an event saying that the order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      meal: {
        id: meal.id,
        price: meal.price,
        stock: meal.stock,
        imagePath: meal.imagePath,
      },
      itemAmount,
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
