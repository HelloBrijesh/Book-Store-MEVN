import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: { type: String, default: "" },
    firstName: { type: String, default: "" },
    userName: { type: String, required: true },
    image: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    verified: { type: Boolean, default: false },
  },
  { timestamp: true }
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const User = mongoose.model("User", userSchema, "users");
