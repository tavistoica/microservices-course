import express, { Request, Response } from "express";
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

app.set("trust proxy", 1);
app.use(json());
app.use(cors({ exposedHeaders: ["set-cookie"] }));
app.use((req, res, next) =>
  cookieSession({
    signed: false,
    domain: req.get("host")?.slice(0, 17).includes("localhost")
      ? "localhost"
      : "tavistoica.xyz",
    secure: !req.get("host")?.slice(0, 17).includes("localhost"), // process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 10000,
  })(req, res, next)
);

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
