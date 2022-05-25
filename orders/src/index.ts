import { connect } from "mongoose";
import { app } from "./app";
import { natsWrapper } from "@ostoica/common";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";
import { logger } from "./utils/logger";
import { throwBootstrapError } from "./utils/helpers";
import { envVariables } from "./utils/constants";

const start = async () => {
  throwBootstrapError(envVariables);

  logger.info(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID!,
    process.env.NATS_CLIENT_ID!,
    process.env.NATS_URL!
  );
  logger.info("connected to Nats");

  const natsClient = natsWrapper.client;

  natsClient.on("close", () => {
    logger.info("NATS connection closed!");
    process.exit();
  });

  process.on("SIGINT", () => natsClient.close());
  process.on("SIGTERM", () => natsClient.close());

  new TicketCreatedListener(natsClient).listen();
  new TicketUpdatedListener(natsClient).listen();
  new ExpirationCompleteListener(natsClient).listen();
  new PaymentCreatedListener(natsClient).listen();

  await connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  logger.info("connected to MongoDB");

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`listening on port ${port}`);
  });
};

start();

export default app;
