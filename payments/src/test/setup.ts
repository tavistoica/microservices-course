import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock("@omstickets/common", () => {
  const original = jest.requireActual("@omstickets/common");

  return {
    __esmodule: true,
    ...original,
    natsWrapper: {
      client: {
        publish: jest
          .fn()
          .mockImplementation(
            (subject: string, data: string, callback: () => void) => {
              callback();
            }
          ),
      },
    },
  };
});
process.env.STRIPE_KEY =
  "sk_test_51JGhaeAltPmlu6DoTpE3nvOGjd6KrXQ8JRxAFN6oLQU3o8sUav5l1WGMbNn4leXuEbpOEjDQ2w6nmGIffReuTkWh00yKBsUKEJ";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdefge";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const payload = {
    id: id ? id : new mongoose.Types.ObjectId().toHexString(),
    password: "refegeg",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};
