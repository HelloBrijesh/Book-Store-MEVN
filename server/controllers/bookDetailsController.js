import { Book } from "../models";
const bookDetailsController = {
  async getbook(req, res, next) {
    let searchedBook;
    let relatedBooks;
    try {
      searchedBook = await Book.find({ _id: req.params.bookid });

      relatedBooks = await Book.find({category:searchedBook[0].category}).limit(4);
    } catch (error) {
      return next(error);
    }

    res.status(200).json({ searchedBook, relatedBooks });
  },
};

export default bookDetailsController;
