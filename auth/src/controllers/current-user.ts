import { Request, Response } from "express";
import { logger } from "../utils/logger";

export const currentUserController = (req: Request, res: Response) => {
  const currentUser = req.currentUser || null;
  logger.info(`currentUser ${JSON.stringify(currentUser).slice(0, 30)}`);
  return res.send({ currentUser });
};
