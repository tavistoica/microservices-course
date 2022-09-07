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

router.get(
  "/api/users/facebook",
  passport.authenticate("facebook"),
  (req, res) => {
    logger.info("goes in next middleware");
    const { accessToken, refreshToken } = req.authInfo as {
      accessToken: string;
      refreshToken: string;
    };

    res.cookie(
      "refreshToken",
      refreshToken,
      COOKIE_CREATE_CONFIG as CookieOptions
    );
    res.send({ accessToken });
    resHandler(res, null, null, CURRENT_PROD_URL);
  }
);

router.get(
  "/api/users/callback",
  passport.authenticate("facebook", {
    session: true,
    successRedirect: CURRENT_PROD_URL,
    failureRedirect: `${CURRENT_PROD_URL}/auth/login`,
  })
);

export { router as loginRouter };
