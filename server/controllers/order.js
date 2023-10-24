import {
  createOrder,
  getSalesDataByDate,
  getOrdersByUserId,
} from "../services/order";

export const placeOrder = async (req, res, next) => {
  const userId = req.user.userId;

  let createdOrder;
  try {
    createdOrder = await createOrder(userId);
  } catch (error) {
    next(error);
  }
  res.status(200).json({ status: "ok", createdOrder });
};

export const getOrders = async (req, res, next) => {
  let userId = req.user.userId;
  let currentPage = req.query.currentpage;

  try {
    const { orders, totalOrders } = await getOrdersByUserId(
      userId,
      currentPage
    );
    res.json({ orders, totalOrders, status: "ok" });
  } catch (error) {
    return next(error);
  }
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
    const { totalData, salesData } = await getSalesDataByDate(
      startDate,
      endDate,
      page
    );
    // console.log(salesData[0]);

    //Handle responses
    if (!salesData) {
      return res.json({
        status: "failure",
      });
    }

    res.json({ salesData, totalData, status: "ok" });
  } catch (error) {
    return next(error);
  }
};
