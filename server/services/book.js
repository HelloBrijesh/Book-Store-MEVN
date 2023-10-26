import { Book } from "../models/book";

export const getAllBook = async (category, price, page, limit) => {
  try {
    const books = await Book.find({
      category: category,
      price: { $lte: price },
      stock: { $gte: 1 },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Book.count({
      category: category,
      price: { $lte: price },
      stock: { $gte: 1 },
    });
    const totalPages = Math.ceil(count / limit);
    return { books, totalPages };
  } catch (error) {
    return error;
  }
};

export const getBookById = async (bookId) => {
  try {
    const book = await Book.findById(bookId);
    return book;
  } catch (error) {
    return error;
  }
};

export const getRelatedBooks = async (category) => {
  try {
    const relatedBooks = await Book.find({
      category: category,
    })
      .sort({ sold: -1 })
      .limit(4);

    return relatedBooks;
  } catch (error) {
    return error;
  }
};

export const getBestSellingBooks = async () => {
  try {
    const bestSellingBooks = await Book.find({}).sort({ sold: -1 }).limit(4);
    return bestSellingBooks;
  } catch (error) {
    return error;
  }
};

export const createBook = async (
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
) => {
  const newBook = new Book({
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
  });
  try {
    await newBook.save();
  } catch (error) {
    return error;
  }
};

export const updateBookById = async (bookId, price, stock) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        price: price,
        stock: stock,
      },
      { new: true }
    );
    return updatedBook;
  } catch (error) {
    return error;
  }
};

export const deleteBookById = async (bookId) => {
  try {
    await Book.findByIdAndDelete(bookId);
  } catch (error) {
    return error;
  }
};
