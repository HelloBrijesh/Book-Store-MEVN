import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const virtual = subscriberSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
subscriberSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Subscriber = mongoose.model(
  "Subscriber",
  subscriberSchema,
  "subscribers"
);
