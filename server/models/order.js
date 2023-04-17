import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderedItems: [],
    billingDetail: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      // phone: { type: String, required: true },
    },
  },
  { timestamp: true }
);

export default mongoose.model("Order", orderSchema, "orders");
