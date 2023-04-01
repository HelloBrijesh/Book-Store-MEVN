import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
  },
  { timestamp: true }
);

export default mongoose.model("User", userSchema, "users");
