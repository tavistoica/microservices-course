import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "@omstickets/common";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

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

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper.client.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("connected to MongoDB");

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start();
