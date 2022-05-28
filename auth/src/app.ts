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

//mongoose //5.10.19
const app = express();

app.use(passport.initialize());

app.set("trust proxy", true);
app.use(json());
app.use(cors({ exposedHeaders: ["set-cookie"], credentials: true }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// enable the "secure" flag on the sessionCookies object
app.use((req, _res, next) => {
  if (req.get("origin")?.slice(0, 17).includes("localhost")) {
    // @ts-ignore
    req["sessionCookies"].secure = true;
  }
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
