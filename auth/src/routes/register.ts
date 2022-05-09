import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@ostoica/common";
import { registerController } from "../controllers/register";

const router = express.Router();

router.post(
  "/api/users/register",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  registerController
);

export { router as registerRouter };
