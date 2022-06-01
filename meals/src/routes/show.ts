import express, { Request, Response } from "express";
import { NotFoundError } from "@ostoica/common";
import { Meal } from "../models/meal.model";

const router = express.Router();

router.get("/api/meals/:id", async (req: Request, res: Response) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) {
    throw new NotFoundError();
  }

  res.send(meal);
});

export { router as showMealRouter };
