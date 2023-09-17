import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    orderedItems: {
      bookId: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
    billingDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      orderNotes: { type: String },
    },
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
