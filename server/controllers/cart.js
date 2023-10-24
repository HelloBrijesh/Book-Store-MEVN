import { customErrorHandler } from "../services";
import {
  addItemInCart,
  createCartByUserId,
  getCartByUserId,
  removeItemFromCart,
} from "../services/cart";

export const fetchCart = async (req, res, next) => {
  //Finding user datails from database
  const userId = req.user.userId;
  let cart;
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      cart = await createCartByUserId(userId);
    }
  } catch (err) {
    return next(err);
  }
  res.json({ cart, status: "ok" });
};

export const addItem = async (req, res, next) => {
  const userId = req.user.userId;
  const bookId = req.query.bookid;
  const quantity = Number(req.query.quantity);
  let cart;

  try {
    cart = await addItemInCart(userId, bookId, quantity);
  } catch (err) {
    return next(err);
  }
  res.json({ status: "ok" });
};

export const removeItem = async (req, res, next) => {
  const userId = req.user.userId;
  const bookId = req.query.bookid;
  const quantity = req.query.quantity;
  const price = req.query.price;

  try {
    await removeItemFromCart(userId, bookId, quantity, price);
  } catch (err) {
    return next(err);
  }
  res.json({ status: "ok" });
};
