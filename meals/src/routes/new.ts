import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  natsWrapper,
  requireRestaurant,
  BadRequestError,
  CustomRequest,
} from "@ostoica/common";
import { Meal } from "../models/meal.model";
import { MealCreatedPublisher } from "../events/publishers/meal-created-publisher";
import { IncomingForm } from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { logger } from "../utils/logger";

const router = express.Router();

const setImage = async (imagePath: string) => {
  const result = await cloudinary.uploader.upload(imagePath);
  logger.info("cloudinary responded with: ", JSON.stringify(result));
  if (result?.public_id) {
    return result.url;
  }
  return "";
};

router.post(
  "/api/meals",
  requireAuth,
  requireRestaurant,
  // [
  //   body("title").not().isEmpty().withMessage("Title is required"),
  //   body("price").isFloat({ gt: 0 }).withMessage("Price must be grater than 0"),
  //   body("stock").isInt({ gt: 0 }).withMessage("Stock must be grater than 0"),
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    const form = new IncomingForm();
    form.parse(req, async (_err, fields, files) => {
      if (
        !fields.title ||
        !fields.price ||
        !fields.stock ||
        //  @ts-ignore
        !files.image.path
      ) {
        throw new BadRequestError("Data sent is incomplete");
      }
      logger.info("has all the fields necessary");

      //  @ts-ignore
      const imagePath = await setImage(files.image.path);
      if (!imagePath) {
        throw new Error("Something went wrong with uploading the image");
      }
      logger.info("image was set in cloudinary");

      console.log("new order with userId: ", (req as CustomRequest).token!.id);

      const { title, price, stock } = fields;
      const meal = Meal.build({
        //  @ts-ignore
        title,
        //  @ts-ignore
        price: parseInt(price),
        //  @ts-ignore
        userId: (req as CustomRequest).token!.id,
        //  @ts-ignore
        stock: parseInt(stock),
        imagePath,
      });
      logger.info("meal was build");

      new MealCreatedPublisher(natsWrapper.client).publish({
        id: meal.id,
        version: meal.version,
        title: meal.title,
        price: meal.price,
        userId: meal.userId,
        stock: meal.stock,
        imagePath: meal.imagePath,
      });
      logger.info("MealCreatedPublisher event was published");

      await meal.save();
      logger.info("meal was saved in db");

      res.status(201).json(meal);
    });
  }
);

export { router as createMealRouter };
