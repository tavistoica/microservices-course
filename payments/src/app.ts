import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@ostoica/common";
import { createChargeRouter } from "./routes/new";

//mongoose //5.10.19
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
