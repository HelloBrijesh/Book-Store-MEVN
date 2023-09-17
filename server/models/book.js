import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "wrong min price"],
      max: [10000, "wrong max price"],
      required: true,
    },
    stock: { type: Number, default: 0 },
    sold: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamp: true }
);

const virtual = bookSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
bookSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Book = mongoose.model("Book", bookSchema, "books");
