import { Order } from "../models/order";
import { Book } from "../models/book";
import { Cart } from "../models/cart";
import { getCartByUserId } from "./cart";

export const createOrder = async (
  userId,
  orderTotal,
  orderedItems,
  address
) => {
  try {
    const cart = await getCartByUserId(userId);

    const newOrder = new Order({
      userId: userId,
      orderTotal: orderTotal,
      orderedItems: orderedItems,
      shippingAddress: address,
    });

    const createdOrder = await newOrder.save();
    for (let book in orderedItems) {
      await Book.findByIdAndUpdate(
        orderedItems[book].bookId,
        { $inc: { stock: -orderedItems[book].quantity } },
        { new: true }
      );
    }

    await Cart.findByIdAndUpdate(cart.id, {
      cartTotal: 0,
      books: [],
      totalItems: 0,
    });
    return createdOrder;
  } catch (error) {
    return error;
  }
};

export const getOrdersByOrderId = async (orderId) => {
  try {
    let orders = await Order.findById(orderId);
    return orders;
  } catch (error) {
    return error;
  }
};
export const getOrdersByUserId = async (userId, currentPage) => {
  try {
    let totalOrders = await Order.count({ userId: userId });
    let orders = await Order.find({ userId: userId })
      .limit(1)
      .skip(currentPage - 1)
      .exec();
    return { totalOrders, orders };
  } catch (error) {
    return error;
  }
};

export const getSalesDataByDate = async (startDate, endDate, page) => {
  try {
    let totalData = Math.ceil((await Order.count()) / 10);
    const salesData = await Order.find({
      createdAt: {
        $gte: new Date(new Date(startDate).setHours(0, 0, 0)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    })
      .limit(10)
      .skip(page - 1)
      .exec();
    return { totalData, salesData };
  } catch (error) {
    return error;
  }
};
