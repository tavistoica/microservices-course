import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface MealAttrs {
  title: string;
  price: number;
  userId: string;
  stock: number;
  imagePath: string;
}

interface MealModel extends mongoose.Model<MealDoc> {
  build(attrs: MealAttrs): MealDoc;
}

interface MealDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  imagePath: string;
  version: number;
  orderId?: string[];
  stock: number;
}

const mealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: [String],
    },
    stock: {
      type: Number,
      require: true,
    },
  },
  {
    toJSON: {
      //    Added to remove password and __v from the object when showing the user object
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        // delete ret.__v;
      },
    },
  }
);

mealSchema.set("versionKey", "version");
mealSchema.plugin(updateIfCurrentPlugin);

mealSchema.statics.build = (attrs: MealAttrs) => {
  return new Meal(attrs);
};

const Meal = mongoose.model<MealDoc, MealModel>("Meal", mealSchema);

export { Meal };
