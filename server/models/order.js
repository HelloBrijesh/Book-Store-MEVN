import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    orderedItems: [bookSchema],
    // billingDetail: {
    //   firstName: { type: String, required: true },
    //   lastName: { type: String, required: true },
    //   address: { type: String, required: true },
    //   state: { type: String, required: true },
    //   postalCode: { type: String, required: true },
    //   email: { type: String, required: true },
    //   phone: { type: String, required: true },
    //   orderNotes: { type: String },
    // },
  },
  { timestamp: true }
);

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Order = mongoose.model("Order", orderSchema, "orders");
