import { Cart } from "../models/cart";
import { getBookById } from "./book";

export const createCartByUserId = async (userId) => {
  const newCart = new Cart({
    userId: userId,
    cartTotal: 0,
    books: [],
  });
  try {
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

export const insertItemInCart = async (userId, bookId, quantity) => {
  try {
    let cart = await getCartByUserId(userId);

    let book = await getBookById(bookId);
    const bookForCart = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      imageUrl: book.imageUrl,
      quantity: quantity,
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
    let updatedCart;
    if (itemExists === false) {
      updatedCart = await Cart.findByIdAndUpdate(
        cart.id,
        {
          $push: { books: [bookForCart] },
          $inc: { totalItems: quantity, cartTotal: total },
        },
        { new: true }
      );
    } else if (itemExists === true) {
      await Cart.updateOne(
        { _id: cart.id, "books.bookId": bookId },
        {
          $inc: {
            totalItems: quantity,
            "books.$.quantity": quantity,
          },
        }
      );
      updatedCart = await Cart.findByIdAndUpdate(cart.id, {
        $inc: { cartTotal: total },
      });
    }
    return updatedCart;
  } catch (error) {
    return error;
  }
};

export const removeItemFromCart = async (userId, bookId, quantity, price) => {
  let total = quantity * price;
  try {
    let cart = await getCartByUserId(userId);
    const updatedCart = await Cart.findByIdAndUpdate(
      cart.id,
      {
        $pull: { books: { bookId: bookId } },
        $inc: { cartTotal: -total, totalItems: -quantity },
      },
      { new: true }
    );
    return updatedCart;
  } catch (error) {
    return error;
  }
};
