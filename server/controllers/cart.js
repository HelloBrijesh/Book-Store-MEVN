import { Book } from "../models/book";
import { Cart } from "../models/cart";
import { customErrorHandler } from "../services";

export const getCartItems = async (req, res, next) => {
  //Finding user datails from database
  const userId = req.user.userId;

  let cart;
  try {
    const cartExists = await Cart.exists({ userId: userId });
    if (!cartExists) {
      const newCart = new Cart({
        userId: userId,
      });
      await newCart.save();
    }

    cart = await Cart.findOne({ userId: userId });
  } catch (err) {
    return next(err);
  }
  let cartItems = cart.books;
  res.json({ cartItems, status: "ok" });
};

export const addItemInCart = async (req, res, next) => {
  const userId = req.user.userId;
  const bookId = req.query.bookid;
  const quantity = Number(req.query.quantity);
  let cart;
  let book;

  try {
    cart = await Cart.findOne({ userId: userId });
    book = await Book.findById(bookId);
    const bookForCart = {
      bookId: book.id,
      quantity: quantity,
      title: book.title,
      author: book.author,
    };

    let itemExists = false;
    for (let item in cart.books) {
      if (cart.books[item].bookId === bookId) {
        itemExists = true;
        break;
      }
    }

    if (itemExists === false) {
      await Cart.findByIdAndUpdate(cart.id, {
        $push: { books: [bookForCart] },
      });
    } else if (itemExists === true) {
      await Cart.updateOne(
        { _id: cart.id, "books.bookId": bookId },
        { $inc: { "books.$.quantity": quantity } }
      );
    }
  } catch (err) {
    return next(err);
  }
  res.json({ status: "ok" });
};
export const removeItemFromCart = async (req, res, next) => {
  const userId = req.user.userId;
  const bookId = req.query.bookid;

  let cart;
  try {
    cart = await Cart.findOne({ userId: userId });
    await Cart.findByIdAndUpdate(cart.id, {
      $pull: { books: { bookId: bookId } },
    });
  } catch (err) {
    return next(err);
  }
  res.json({ status: "ok" });
};
