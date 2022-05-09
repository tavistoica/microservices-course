import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@ostoica/common";
import { loginController } from "../controllers/login";

const router = express.Router();

router.post(
  "/api/users/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a valid password"),
  ],
  validateRequest,
  loginController
);

export { router as loginRouter };
