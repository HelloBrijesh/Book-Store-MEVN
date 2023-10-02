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
  let currentPage = req.params.page;
  let totalOrders;
  let order;
  try {
    totalOrders = await Order.count({ userId: userId });
    order = await Order.find({ userId: userId })
      .limit(1)
      .skip(currentPage - 1)
      .exec();
  } catch (error) {
    return next(error);
  }

  res.json({ order, totalOrders, status: "ok" });
};
