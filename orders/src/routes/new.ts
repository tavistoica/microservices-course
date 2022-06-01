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
import { Meal } from "../model/meal.model";
import { Order } from "../model/order.model";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { logger } from "../utils/logger";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 5 * 60;

router.post(
  "/api/orders",
  requireAuth,
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

    // await meal.save();

    //  Make sure the meal is not already reserved
    // const isReserved = await meal.isReserved();
    // if (isReserved) {
    //   throw new BadRequestError("meal is already reserved");
    // }

    //  Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    //  Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      meal,
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
