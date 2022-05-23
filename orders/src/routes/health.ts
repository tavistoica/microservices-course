import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/orders/health", async (_req: Request, res: Response) => {
  res.status(200).send("service is running");
});

export { router as healthRouter };
