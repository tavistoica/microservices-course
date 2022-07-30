import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: {
    email: string;
    role: string;
  };
}

interface Token {
  email: string;
  role: string;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && typeof authHeader === "string") {
    try {
      const decoded = jwt.verify(
        authHeader,
        process.env.ACCESS_TOKEN_PRIVATE_KEY!
      );
      (req as CustomRequest).token = decoded as Token;
      next();
    } catch (err) {
      console.log("err", err);
      return res.sendStatus(403); //invalid token
    }
  }
};
