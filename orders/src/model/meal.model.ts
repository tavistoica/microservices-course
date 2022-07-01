import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order, OrderStatus } from "./order.model";

interface MealAttrs {
  id: string;
  title: string;
  price: number;
  stock: number;
  userId: string;
  imagePath: string;
}

export interface MealDoc extends mongoose.Document {
  title: string;
  price: number;
  stock: number;
  imagePath: string;
  userId: string;
  version: number;
  isReserved(): Promise<boolean>;
}

interface MealModel extends mongoose.Model<MealDoc> {
  build(attrs: MealAttrs): MealDoc;
  findByEvent(event: { id: string; version: number }): Promise<MealDoc | null>;
}

const mealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    imagePath: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

mealSchema.set("versionKey", "version");
mealSchema.plugin(updateIfCurrentPlugin);

mealSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Meal.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
mealSchema.statics.build = (attrs: MealAttrs) => {
  return new Meal({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    stock: attrs.stock,
    userId: attrs.userId,
    imagePath: attrs.imagePath,
  });
};

mealSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    meal: this as any,
    status: {
      $in: [
        OrderStatus.Pending,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Meal = mongoose.model<MealDoc, MealModel>("Meal", mealSchema);

export { Meal };
