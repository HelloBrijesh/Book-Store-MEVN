import { Cart } from "../models/cart";
import { Order } from "../models/order";

export const placeOrder = async (req, res, next) => {
  const userId = req.user.userId;

  let savedOrder;
  try {
    const cart = await Cart.findOne({ userId: userId });

    const newOrder = new Order({
      userId: userId,
      orderTotal: cart.cartTotal,
      orderedItems: cart.books,
    });
    savedOrder = await newOrder.save();

    await Cart.findByIdAndUpdate(cart.id, {
      cartTotal: 0,
      books: [],
      totalItems: 0,
    });
  } catch (error) {
    next(error);
  }
  res.status(200).json({ status: "ok", savedOrder });
};

export const getAllOrders = async (req, res, next) => {
  let userId = req.user.userId;

  let order;
  try {
    order = await Order.find({ userId: userId });
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ order });
};
