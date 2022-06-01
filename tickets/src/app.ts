import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@ostoica/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";
import { sellerMealsRouter } from "./routes/seller-meals";
import { deleteRouter } from "./routes/delete-db";
import { uploadImage } from "./middleware/uploadImage";

//mongoose //5.10.19
const app = express();
console.log("test secure response", process.env.NODE_ENV);
app.set("trust proxy", true);
app.use(json());
app.use(cors({ exposedHeaders: ["set-cookie"], credentials: true }));
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.use(sellerMealsRouter);
app.use(deleteRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
