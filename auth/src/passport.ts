import passport from "passport";
import strategy from "passport-facebook";
import jwt from "jsonwebtoken";
import { logger } from "./utils/logger";

import { User } from "./models/user.model";
import { UserRole } from "./types/users.types";

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: typeof User, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
      profileFields: ["email", "name"],
    },
    async (_accessToken, _refreshToken, profile: strategy.Profile, done) => {
      const { email, id } = profile._json;
      logger.info(`test profile ${JSON.stringify(profile._json)}`);
      const userData: { email: string; role: UserRole } = {
        email: email || id,
        role: "User",
      };
      logger.info(`userData ${JSON.stringify(userData)}`);

      const checkUser = await User.findOne({ email: email || id });
      logger.info(`checkUser ${JSON.stringify(checkUser)}`);
      if (!checkUser) {
        const user = await User.build(userData).save();

        const jwtToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_KEY!
        );
        logger.info(`!checkUser ${jwtToken} ${JSON.stringify(profile)}`);

        done(null, profile, { jwtToken });
        return;
      }

      const jwtToken = jwt.sign(
        {
          id: checkUser!._id,
          email: checkUser!.email,
          role: checkUser!.role,
        },
        process.env.JWT_KEY!
      );

      logger.info(`data in checkUser ${jwtToken} ${JSON.stringify(profile)}`);

      done(null, profile, { jwtToken });
    }
  )
);
