import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  natsWrapper,
  requireSeller,
  BadRequestError,
} from "@ostoica/common";
import { Ticket } from "../models/ticket.model";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
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
  "/api/tickets",
  requireAuth,
  requireSeller,
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

      const { title, price, stock } = fields;
      const ticket = Ticket.build({
        //  @ts-ignore
        title,
        //  @ts-ignore
        price: parseInt(price),
        //  @ts-ignore
        userId: req.currentUser?.id || "",
        //  @ts-ignore
        stock: parseInt(stock),
        imagePath,
      });
      logger.info("ticket was build");

      new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        stock: ticket.stock,
        imagePath: ticket.imagePath,
      });
      logger.info("TicketCreatedPublisher event was published");

      await ticket.save();
      logger.info("ticket was saved in db");

      res.status(201).json(ticket);
    });
  }
);

export { router as createTicketRouter };
