import { Cart } from "../models/cart";
import { getBookById } from "./book";

export const createCartByUserId = async (userId) => {
  try {
    const newCart = new Cart({
      userId: userId,
      cartTotal: 0,
      books: [],
    });

    const cart = await newCart.save();
    return cart;
  } catch (error) {
    return error;
  }
};

export const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId: userId });
    return cart;
  } catch (error) {
    return error;
  }
};

export const addItemInCart = async (userId, bookId, quantity) => {
  try {
    let cart = await getCartByUserId(userId);

    let book = await getBookById(bookId);
    const bookForCart = {
      bookId: book.id,
      quantity: quantity,
      title: book.title,
      author: book.author,
      image: book.image,
      price: book.price,
    };

    let itemExists = false;
    for (let item in cart.books) {
      if (cart.books[item].bookId === bookId) {
        itemExists = true;
        break;
      }
    }
    let total = book.price * quantity;
    if (itemExists === false) {
      await Cart.findByIdAndUpdate(cart.id, {
        $push: { books: [bookForCart] },
        $inc: { totalItems: quantity },
      });
      await Cart.findByIdAndUpdate(cart.id, {
        $inc: { cartTotal: total },
      });
    } else if (itemExists === true) {
      await Cart.updateOne(
        { _id: cart.id, "books.bookId": bookId },
        { $inc: { totalItems: quantity, "books.$.quantity": quantity } }
      );
      await Cart.findByIdAndUpdate(cart.id, {
        $inc: { cartTotal: total },
      });
    }
  } catch (error) {
    return error;
  }
};

export const removeItemFromCart = async (userId, bookId, quantity, price) => {
  let total = quantity * price;
  try {
    let cart = await getCartByUserId(userId);
    await Cart.findByIdAndUpdate(cart.id, {
      $pull: { books: { bookId: bookId } },
    });
    await Cart.findByIdAndUpdate(cart.id, {
      $inc: { cartTotal: -total, totalItems: -quantity },
    });
  } catch (error) {
    return error;
  }
};
