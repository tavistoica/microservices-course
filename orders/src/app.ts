import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@ostoica/common";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
import { completeOrderRouter } from "./routes/complete";
import { healthRouter } from "./routes/health";
import { deleteRouter } from "./routes/delete-db";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cors({
    exposedHeaders: ["set-cookie"],
    credentials: true,
    origin: ["https://localhost:3000", "https://www.tavistoica.xyz"],
  })
);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(currentUser);

app.use(healthRouter);

app.use(newOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(completeOrderRouter);
app.use(deleteRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
