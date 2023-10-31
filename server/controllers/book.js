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
  const category = req.query.category;
  const price = Number(req.query.price);
  const page = Number(req.query.page);

  try {
    let { books, totalPages } = await getAllBook(category, price, page, limit);
    res.status(200).json({ status: "ok", books, totalPages });
  } catch (error) {
    return next(error);
  }
};

export const fetchBookById = async (req, res, next) => {
  let bookId = req.params.id;
  try {
    const bookById = await getBookById(bookId);
    const relatedBooks = await getRelatedBooks(bookById.category);
    res.status(200).json({ bookById, relatedBooks, status: "ok" });
  } catch (error) {
    return next(error);
  }
};

export const fetchBestSellingBooks = async (req, res, next) => {
  try {
    const bestSellingBooks = await getBestSellingBooks();
    res.status(200).json({ bestSellingBooks });
  } catch (error) {
    return next(error);
  }
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
    imageUrl: Joi.string().required(),
    imageName: Joi.string().required(),
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
    imageUrl,
    imageName,
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
      imageUrl,
      imageName,
      language
    );
    res.status(200).json({ status: "ok" });
  } catch (error) {
    return next(error);
  }
};

export const updateBook = async (req, res, next) => {
  const price = req.body.price;
  const stock = req.body.stock;
  const bookId = req.params.id;

  try {
    const updatedBook = await updateBookById(bookId, price, stock);
    res.status(200).json({ status: "ok", updatedBook });
  } catch (error) {
    return next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;
  try {
    await deleteBookById(bookId);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    return next(error);
  }
};
