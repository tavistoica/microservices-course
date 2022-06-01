import { Request, Response, NextFunction } from "express";
import { IncomingForm } from "formidable";
import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const form = new IncomingForm();

  form.parse(req, async (_err, fields, files) => {
    const result = await cloudinary.uploader.upload(
      //  @ts-ignore
      files.image.path
    );
    if (result?.public_id) {
      // req.body.imagePath = result.url;
      fields.imagePath = result.url;
      // The results in the web browser will be returned inform of plain text formart. We shall use the util that we required at the top of this code to do this.
      console.log("res", result);
      next();
    }
    // req.body.imagePath = null;
    fields.imagePath = "";

    next();
  });
};
