import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sold: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bookDescription: { type: String, required: true },
  },
  { timestamp: true }
);

export default mongoose.model("Book", bookSchema, "books");
