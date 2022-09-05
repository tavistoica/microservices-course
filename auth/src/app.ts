import express, { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@ostoica/common";
import "express-async-errors";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import * as OpenApiValidator from "express-openapi-validator";
import { serve, setup } from "swagger-ui-express";

import { currentUserRouter } from "./routes/current-user";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { registerRouter } from "./routes/register";
import { refreshTokenRouter } from "./routes/refresh-token";

import swaggerDocument from "../swagger/spec.json";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();

app.use(passport.initialize());

app.set("trust proxy", true);
app.use(express.json());
app.use(cookieParser());

const IS_NOT_PRODUCTION = process.env.NODE_ENV !== "production";
if (IS_NOT_PRODUCTION) {
  app.use("/docs", serve, setup(swaggerDocument));
}

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
// app.use((req: Request, _res: Response, next: NextFunction) => {
//   req["sessionCookies"].secure = true;
//   next();
// });

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true,
  })
);

app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);
app.use(refreshTokenRouter);

app.use(errorHandler);

export { app };
