import { Request, Response, NextFunction } from "express";
import { CustomError } from "@ostoica/common";
import { HttpError } from "express-openapi-validator/dist/framework/types";

// interface CustomError {
//   status: number;
//   type: string;
//   short: string;
//   detail: string;
//   placement: string;
// }

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode || 500;
  let message = err.message || "Something unexpected happened";
  //   const placement = err.placement || "global";

  if (err instanceof HttpError) {
    // type = "swagger error";
    message = `Request${err.errors[0].path} ${err.errors[0].message}`;
  }

  return res.status(status).send({ message });
};
