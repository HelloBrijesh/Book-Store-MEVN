import { Book } from "../models/book";
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

    for (let book in cart.books) {
      await Book.findByIdAndUpdate(
        cart.books[book].bookId,
        { $inc: { stock: -cart.books[book].quantity } },
        { new: true }
      );
    }

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

export const getSalesData = async (req, res, next) => {
  try {
    let { startDate, endDate, page } = req.query;
    //check that date is not empty
    if (startDate === "" || endDate === "") {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you pick two dates",
      });
    }

    //check that date is in the right format
    //expected result: YYY-MMM-DDD

    //Query database using Mongoose
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
    // console.log(salesData[0]);

    //Handle responses
    if (!salesData) {
      return res.json({
        status: "failure",
      });
    }

    console.log(data);

    res.json({ salesData, totalData, status: "ok" });
  } catch (error) {
    return next(error);
  }
};
