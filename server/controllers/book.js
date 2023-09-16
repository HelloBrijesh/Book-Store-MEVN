import { Book } from "../models/book";

export const getBookById = async (req, res, next) => {
  let searchedBook;
  let relatedBooks;
  try {
    searchedBook = await Book.find({ id: req.params.bookid });

    relatedBooks = await Book.find({
      category: searchedBook[0].category,
    })
      .sort({ sold: -1 })
      .limit(4);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ searchedBook, relatedBooks });
};

export const getAllBooks = async (req, res, next) => {
  const { category, price } = req.body;
  const limit = 9;
  const page = req.params.currentPage;
  let searchedBooks;
  let count;
  try {
    searchedBooks = await Book.find({
      category: category,
      price: { $lte: price },
      quantity: { $gte: 1 },
    })
      .select("-bookDescription -__v")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    count = await Book.count({
      category: category,
      price: { $lte: price },
      quantity: { $gte: 1 },
    });
  } catch (error) {
    return next(error);
  }
  const totalPages = Math.ceil(count / limit);

  res.status(200).json({ searchedBooks, totalPages });
};

export const getBestSellingBooks = async (req, res, next) => {
  let listOfBooks;

  try {
    listOfBooks = await Book.find({}).sort({ sold: -1 }).limit(4);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ listOfBooks });
};
