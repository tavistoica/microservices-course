import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
  BadRequestError,
  natsWrapper,
  requireSeller,
} from "@ostoica/common";
import { body } from "express-validator";
import { Meal } from "../models/meal.model";
import { MealUpdatedPublisher } from "../events/publishers/meal-updated-publisher";

const router = express.Router();

router.put(
  "/api/meals/:id",
  requireAuth,
  requireSeller,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be grater than 0"),
    body("stock").isInt({ gt: 0 }).withMessage("Stock must be grater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      throw new NotFoundError();
    }

    if (meal.orderId) {
      throw new BadRequestError("Cannot edit a reserved meal");
    }

    if (meal.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    meal.set({ title: req.body.title, price: req.body.price });

    await meal.save();

    new MealUpdatedPublisher(natsWrapper.client).publish({
      id: meal.id,
      version: meal.version,
      title: meal.title,
      price: meal.price,
      userId: meal.userId,
      stock: meal.stock,
      imagePath: meal.imagePath,
    });

    res.json(meal);
  }
);

export { router as updateMealRouter };
