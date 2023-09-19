import Joi from "joi";
import { Book } from "../models/book";

export const getBookById = async (req, res, next) => {
  let bookById;
  let relatedBooks;
  try {
    bookById = await Book.findById(req.params["bookid"]);

    relatedBooks = await Book.find({
      category: bookById.category,
    })
      .sort({ sold: -1 })
      .limit(4);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ bookById, relatedBooks, status: "ok" });
};

export const getAllBooks = async (req, res, next) => {
  const limit = 12;
  let books;
  let count;

  const category = req.query.category;
  const price = Number(req.query.price);
  const page = Number(req.query.page);

  try {
    books = await Book.find({
      category: category,
      price: { $lte: price },
      stock: { $gte: 1 },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    count = await Book.count({
      category: category,
      price: { $lte: price },
      stock: { $gte: 1 },
    });
  } catch (error) {
    return next(error);
  }

  const totalPages = Math.ceil(count / limit);
  res.status(200).json({ status: "ok", books, totalPages });
};

export const getBestSellingBooks = async (req, res, next) => {
  let bestSellingBooks;
  try {
    bestSellingBooks = await Book.find({}).sort({ sold: -1 }).limit(4);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ bestSellingBooks });
};

export const addBook = async (req, res, next) => {
  // Validating the book input
  const bookSchema = Joi.object({
    title: Joi.string().min(4).required(),
    author: Joi.string().min(4).required(),
    price: Joi.number().min(1).max(10000).required(),
    description: Joi.string(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
  });

  const { error } = bookSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { title, author, price, description, stock, category, image } =
    req.body;

  const newBook = new Book({
    title,
    author,
    price,
    description,
    stock,
    category,
    image,
  });

  try {
    await newBook.save();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: "ok" });
};

export const deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.bookid);
  } catch (error) {
    return next(error);
  }
  res.status(200).json({ status: "ok" });
};
