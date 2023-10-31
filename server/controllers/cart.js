import { customErrorHandler } from "../services";
import {
  insertItemInCart,
  createCartByUserId,
  getCartByUserId,
  removeItemFromCart,
} from "../services/cart";

export const fetchCart = async (req, res, next) => {
  //Finding user datails from database
  const userId = req.user.userId;

  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      cart = await createCartByUserId(userId);
    }
    res.status(200).json({ cart, status: "ok" });
  } catch (err) {
    return next(err);
  }
};

export const addItemInCart = async (req, res, next) => {
  const userId = req.user.userId;
  const bookId = req.query.bookid;
  const quantity = Number(req.query.quantity);

  try {
    const updatedCart = await insertItemInCart(userId, bookId, quantity);
    res.status(200).json({ updatedCart, status: "ok" });
  } catch (err) {
    return next(err);
  }
};

export const deleteItemFromCart = async (req, res, next) => {
  const userId = req.user.userId;
  const bookId = req.query.bookid;
  const quantity = req.query.quantity;
  const price = req.query.price;
  try {
    const updatedCart = await removeItemFromCart(
      userId,
      bookId,
      quantity,
      price
    );
    res.status(200).json({ updatedCart, status: "ok" });
  } catch (err) {
    return next(err);
  }
};
