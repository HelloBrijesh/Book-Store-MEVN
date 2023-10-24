import Joi from "joi";
import {
  getAllBook,
  getBookById,
  getRelatedBooks,
  getBestSellingBooks,
  createBook,
  updateBookById,
  deleteBookById,
} from "../services/book";

export const fetchBooks = async (req, res, next) => {
  const limit = 12;
  let books;
  let count;

  const category = req.query.category;
  const price = Number(req.query.price);
  const page = Number(req.query.page);

  try {
    books = await getAllBook(category, price, page, limit);
  } catch (error) {
    return next(error);
  }

  const totalPages = Math.ceil(count / limit);
  res.status(200).json({ status: "ok", books, totalPages });
};

export const fetchBookById = async (req, res, next) => {
  let bookById;
  let relatedBooks;
  let bookId = req.params.id;
  try {
    bookById = await getBookById(bookId);
    relatedBooks = await getRelatedBooks(bookById.category);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ bookById, relatedBooks, status: "ok" });
};

export const fetchBestSellingBooks = async (req, res, next) => {
  let bestSellingBooks;
  try {
    bestSellingBooks = await getBestSellingBooks();
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
    description: Joi.string(),
    price: Joi.number().min(1).max(10000).required(),
    year: Joi.number().min(1).max(10000).required(),
    pages: Joi.number().min(1).max(10000).required(),
    stock: Joi.number().min(1).required(),
    sold: Joi.number().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    language: Joi.string().required(),
  });

  const { error } = bookSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const {
    title,
    author,
    description,
    price,
    year,
    pages,
    stock,
    sold,
    category,
    image,
    language,
  } = req.body;

  try {
    await createBook(
      title,
      author,
      description,
      price,
      year,
      pages,
      stock,
      sold,
      category,
      image,
      language
    );
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: "ok" });
};

export const updateBook = async (req, res, next) => {
  const price = req.body.price;
  const stock = req.body.stock;
  const bookId = req.params.id;

  let book;
  try {
    await updateBookById(bookId, price, stock);
    book = await getBookById(bookId);
  } catch (error) {
    return next(error);
  }
  res.json({ status: "ok", book });
};

export const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    await deleteBookById(bookId);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: "ok" });
};
