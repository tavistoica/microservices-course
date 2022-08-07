import express, {Request, Response, NextFunction} from "express";
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
app.use(
  cors({
    exposedHeaders: ["set-cookie", "authorization"],
    credentials: true,
    origin: ["https://localhost:3000", "https://www.tavistoica.xyz"],
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
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
app.use((req: Request, _res: Response, next: NextFunction) => {
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
