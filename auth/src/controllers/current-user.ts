import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { BadRequestError } from "@ostoica/common";

import { User } from "../models/user.model";
import { CustomRequest } from "../middleware/verifyJWT";

export const currentUserController = async (req: Request, res: Response) => {
  // @ts-ignore
  if (!(req as CustomRequest).token || !(req as CustomRequest).token?.email) {
    throw new BadRequestError("Invalid credentials");
  }

  const currentUser = await User.findOne({
    // @ts-ignore
    email: (req as CustomRequest).token.email,
  });
  logger.info(`currentUser ${JSON.stringify(currentUser).slice(0, 30)}`);
  return res.send({ currentUser });
};
