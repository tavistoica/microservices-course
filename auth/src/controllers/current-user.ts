import { Request, Response } from "express";

export const currentUserController = (req: Request, res: Response) => {
  return res.send({ currentUser: req.currentUser || null });
};
