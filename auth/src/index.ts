import mongoose from "mongoose";
import { app } from "./app";
import { logger } from "./utils/logger";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Environment variable 'JWT_KEY' is not defined.");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Environment variable 'MONGO_URI' is not defined.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.info("connected to MongoDB");
  } catch (err) {
    logger.info(err);
  }

  app.listen(3001, () => {
    logger.info("listening on port 3001");
  });
};

start();
