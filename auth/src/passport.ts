import passport from "passport";
import strategy from "passport-facebook";

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
    (_accessToken, _refreshToken, profile, done) => {
      const { email } = profile._json;
      const userData = {
        email,
      };
      new User(userData).save();
      done(null, profile);
    }
  )
);
