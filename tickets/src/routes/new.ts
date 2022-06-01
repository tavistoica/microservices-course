import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  natsWrapper,
  requireSeller,
  BadRequestError,
} from "@ostoica/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { uploadImage } from "../middleware/uploadImage";
import { IncomingForm } from "formidable";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

const setImage = async (imagePath: string) => {
  const result = await cloudinary.uploader.upload(imagePath);
  if (result?.public_id) {
    // req.body.imagePath = result.url;
    return result.url;
  }
  // req.body.imagePath = null;
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
      if (!fields.title || !fields.price || !fields.stock) {
        throw new BadRequestError("Data sent is incomplete");
      }

      //  @ts-ignore
      const imagePath = await setImage(files.image.path);
      if (!imagePath) {
        throw new Error("Something went wrong with uploading the image");
      }

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

      new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        version: ticket.version,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        stock: ticket.stock,
        imagePath: ticket.imagePath,
      });

      await ticket.save();

      res.status(201).json(ticket);
    });
  }
);

export { router as createTicketRouter };
