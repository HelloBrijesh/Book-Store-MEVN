import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  quantiy: { type: Number, default: 0 },
  books: [mongoose.ObjectId],
  userId: [mongoose.ObjectId],
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Cart = mongoose.model("Cart", orderSchema, "carts");
