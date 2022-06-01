import express, { Request, Response } from "express";
import { Meal } from "../models/meal.model";

const router = express.Router();

router.delete("/api/meals", async (req: Request, res: Response) => {
  const meals = await Meal.remove();

  res.send("Removed meals collection");
});

export { router as deleteRouter };
