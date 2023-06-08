import { Book } from "../models";
const shopController = {
  async shop(req, res, next) {
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
  },
  async bestSellingBooks(req, res, next) {
    let listOfBooks;

    try {
      listOfBooks = await Book.find({}).sort({ sold: -1 }).limit(4);
    } catch (error) {
      return next(error);
    }

    res.status(200).json({ listOfBooks });
  },
};
export default shopController;
