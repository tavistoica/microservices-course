import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@ostoica/common";
import { registerController } from "../controllers/register";

const router = express.Router();

router.post("/api/users/register", registerController);

export { router as registerRouter };
