import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";

import "./passport";
import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { registerRouter } from "./routes/register";
import { errorHandler, NotFoundError } from "@ostoica/common";

const app = express();

app.use(passport.initialize());

app.set("trust proxy", true);
app.use(json());
app.use(cors({ exposedHeaders: ["set-cookie"], credentials: true }));
app.use((req, res, next) => {
  return cookieSession({
    signed: false,
    // domain: req.get("origin")?.slice(0, 17).includes("localhost")
    //   ? "https://localhost:3000"
    //   : "tavistoica.xyz",
    secure: true, // process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  })(req, res, next);
});

// enable the "secure" flag on the sessionCookies object
app.use((req, _res, next) => {
  // @ts-ignore
  req["sessionCookies"].secure = true;
  next();
});

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
