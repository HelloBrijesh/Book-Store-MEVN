import Joi from "joi";
import { Book } from "../models/book";

export const addBook = async (req, res, next) => {
  // Validating the book input
  const bookSchema = Joi.object({
    bookName: Joi.string().min(4).required(),
    authorName: Joi.string().min(4).required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().required(),
    bookDescription: Joi.string(),
  });
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const {
    bookName,
    authorName,
    price,
    quantity,
    category,
    imageUrl,
    bookDescription,
  } = req.body;

  const newBook = new Book({
    bookName,
    authorName,
    price,
    quantity,
    category,
    imageUrl,
    bookDescription,
  });

  try {
    await newBook.save();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: "ok" });
};

export const deleteBook = async (req, res, next) => {
  // Validating the book input
  const bookId = req.params.bookid;
  try {
    await Book.deleteOne({ id: bookId });
  } catch (error) {
    return next(error);
  }
  res.status(200).json({ status: "ok" });
};
