import { Book } from "../models";
const shopController = {
  async shop(req, res, next) {
    console.log(req.body);
    const { category, price } = req.body;
    const limit = 10;
    const page = 1;
    let searchedBooks;
    let count;
    try {
      searchedBooks = await Book.find({ category: category, price: { $lte: price }, quantity: { $gte: 1 } })
        .select("-category -quantity -bookDescription -__v")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      count = await Book.count({ category: category, price: { $lte: price }, quantity: { $gte: 1 } });
    } catch (error) {
      return next(error);
    }
    const totalPages = Math.ceil(count / limit);
    const currentPage = page;

    res.status(200).json({ searchedBooks, totalPages });
  },
};
export default shopController;
