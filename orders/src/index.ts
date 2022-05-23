import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "@ostoica/common";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";
import { logger } from "./utils/logger";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Environment variable 'JWT_KEY' is not defined.");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Environment variable 'MONGO_URI' is not defined.");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("Environment variable 'NATS_CLIENT_ID' is not defined.");
  }
  if (!process.env.NATS_URL) {
    throw new Error("Environment variable 'NATS_URL' is not defined.");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("Environment variable 'NATS_CLUSTER_ID' is not defined.");
  }

  if (process.env.NODE_ENV !== "development") {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      logger.info("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  logger.info("connected to MongoDB");

  app.listen(3000, () => {
    logger.info("listening on port 3000");
  });
};

start();

export default app;
