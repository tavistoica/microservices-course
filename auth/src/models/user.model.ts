import mongoose from "mongoose";
import { Password } from "../services/password";

import { UserType } from "@ostoica/common";

interface UserAttrs {
  email: string;
  role: UserType;
  password?: string;
  lon?: number;
  lat?: number;
  profileImagePath?: string;
}

interface RestaurantAttrs {
  email: string;
  role: UserType;
  password?: string;
  lon: number;
  lat: number;
  profileImagePath: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  role: UserType;
  password?: string;
  lon?: number;
  lat?: number;
  profileImagePath?: string;
}

interface RestaurantDoc extends mongoose.Document {
  email: string;
  role: UserType;
  password: string;
  lon: number;
  lat: number;
  profileImagePath?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: false,
    },
    lon: {
      type: Number,
      require: false,
    },
    lat: {
      type: Number,
      require: false,
    },
    profileImagePath: {
      type: String,
      require: false,
    },
  },
  {
    toJSON: {
      //    Added to remove password and __v from the object when showing the user object
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs | RestaurantAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc | RestaurantDoc, UserModel>(
  "User",
  userSchema
);

export { User };
