import express, { CookieOptions } from "express";
import passport from "passport";
import { validateRequest } from "@ostoica/common";
import { loginController } from "../controllers/login";
import { resHandler } from "../utils/res-handler";
import { logger } from "../utils/logger";
import { COOKIE_CREATE_CONFIG, CURRENT_PROD_URL } from "../utils/constants";

const router = express.Router();

router.post(
  "/api/users/login",
  // [
  //   body("email").isEmail().withMessage("Email must be valid"),
  //   body("password")
  //     .trim()
  //     .notEmpty()
  //     .withMessage("You must supply a valid password"),
  // ],
  validateRequest,
  loginController
);

router.get("/api/users/facebook", passport.authenticate("facebook"));

router.get(
  "/api/users/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `${CURRENT_PROD_URL}/auth/login`,
  }),
  (req, res) => {
    logger.info(`goes in next middleware - ${req.authInfo} `);
    const { accessToken, refreshToken } = req.authInfo as {
      accessToken: string;
      refreshToken: string;
    };
    res.cookie(
      "refreshToken",
      refreshToken,
      COOKIE_CREATE_CONFIG as CookieOptions
    );
    logger.info(`res after setting the cookie - ${res}`);
    resHandler(res, null, null, `${CURRENT_PROD_URL}/auth/${accessToken}`);
  }
);

export { router as loginRouter };
