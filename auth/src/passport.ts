import passport from "passport";
import strategy from "passport-facebook";
import jwt from "jsonwebtoken";

import { User } from "./models/user.model";

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
      const { email } = profile._json;
      const userData = {
        email,
        role: "User",
      };
      const user = await new User(userData).save();

      const jwtToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_KEY!
      );

      done(null, profile, { jwtToken });
    }
  )
);
