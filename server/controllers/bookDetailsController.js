import { Book } from "../models";
const bookDetailsController = {
  async getbook(req, res, next) {
    console.log(req.params.bookid);
    let searchedBook;
    try {
      searchedBook = await Book.find({ _id: req.params.bookid });
    } catch (error) {
      return next(error);
    }

    res.status(200).json({ searchedBook });
  },
};

export default bookDetailsController;
