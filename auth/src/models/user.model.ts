import mongoose from "mongoose";
import { Password } from "../services/password";

type UserRole = "Admin" | "User" | "Seller";

interface UserAttrs {
  email: string;
  password?: string;
  role: UserRole;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password?: string;
  role: UserRole;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: false,
    },
    role: {
      type: String,
      require: true,
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

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
