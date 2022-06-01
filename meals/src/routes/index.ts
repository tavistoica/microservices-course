import express, { Request, Response } from "express";
import { Meal } from "../models/meal.model";

const router = express.Router();

router.get("/api/meals", async (req: Request, res: Response) => {
  const meals = await Meal.find({
    stock: { $gt: 0 },
  });

  res.send(meals);
});

export { router as indexMealRouter };
