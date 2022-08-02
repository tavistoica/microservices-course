import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { registerRouter } from "./routes/register";
import { refreshTokenRouter } from "./routes/refresh-token";
import { errorHandler, NotFoundError } from "@ostoica/common";

const app = express();

app.use(passport.initialize());

app.set("trust proxy", true);
app.use(json());
app.use(cookieParser());
app.use((_req, res) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});
app.use(
  cors({
    exposedHeaders: ["set-cookie"],
    credentials: true,
    origin: ["https://localhost:3000", "https://www.tavistoica.xyz"],
  })
);
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
app.use(refreshTokenRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
