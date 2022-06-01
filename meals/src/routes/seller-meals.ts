import express, { Request, Response } from "express";
import { Meal } from "../models/meal.model";

const router = express.Router();

router.get("/api/meals/users/:id", async (req: Request, res: Response) => {
  try {
    const meals = await Meal.find({
      userId: req.params.id,
      stock: { $gt: 0 },
    });
    res.send(meals);
  } catch (err) {
    res.send([]);
  }
});

export { router as sellerMealsRouter };
