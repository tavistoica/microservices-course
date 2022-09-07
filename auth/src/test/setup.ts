import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  function signin(): Promise<{ accessToken: string; refreshToken: string }>;
}

process.env.SALT = "TEST123";
process.env.REFRESH_TOKEN_PRIVATE_KEY = "TEST123";
process.env.ACCESS_TOKEN_PRIVATE_KEY = "TEST123";
process.env.FACEBOOK_CLIENT_ID = "test";
process.env.FACEBOOK_CLIENT_SECRET = "test";
process.env.FACEBOOK_CALLBACK_URL = "test";
process.env.MONGO_URI = "localhost:27017"; //localhost:27017

const mockedUser = {
  email: "test@test.com",
  password: "password",
  role: "Customer",
};

let mongo: MongoMemoryServer | null;
beforeAll(async () => {
  process.env.JWT_KEY = "asdefge";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send(mockedUser)
    .expect(201);

  const refreshToken = response.body.refreshToken;
  const accessToken = response.body.accessToken;

  return { refreshToken, accessToken };
};
