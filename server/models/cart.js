import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartTotal: { type: Number, required: true },
  totalItems: { type: Number, default: 0 },
  books: [bookSchema],
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

export const Cart = mongoose.model("Cart", cartSchema, "carts");
