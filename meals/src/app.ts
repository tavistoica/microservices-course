import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@ostoica/common";
import { createMealRouter } from "./routes/new";
import { showMealRouter } from "./routes/show";
import { indexMealRouter } from "./routes/index";
import { updateMealRouter } from "./routes/update";
import { restaurantMealsRouter } from "./routes/restaurant-meals";
import { deleteRouter } from "./routes/delete-db";

//mongoose //5.10.19
const app = express();
console.log("test secure response", process.env.NODE_ENV);
app.set("trust proxy", true);
app.use(json());
app.use(
  cors({
    exposedHeaders: ["set-cookie"],
    credentials: true,
    origin: ["https://localhost:3000", "https://www.tavistoica.xyz"],
  })
);
app.use((_req, res) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(currentUser);

app.use(createMealRouter);
app.use(showMealRouter);
app.use(indexMealRouter);
app.use(updateMealRouter);
app.use(restaurantMealsRouter);
app.use(deleteRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
