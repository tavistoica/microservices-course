import express from "express";
import { body } from "express-validator";
import passport from "passport";
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

router.get("/api/users/facebook", passport.authenticate("facebook"));

router.get(
  "/api/users/callback",
  passport.authenticate("facebook", {
    successRedirect: "https://www.tavistoica.xyz/",
    failureRedirect: "https://www.tavistoica.xyz/auth/login",
  }),
  (req, res) => {
    // @ts-ignore
    const token = req.authInfo?.jwtToken;
    req.session = { jwt: token };
    res.redirect("https://www.tavistoica.xyz/");
  }
);

export { router as loginRouter };
