import { Order } from "../models";

const orderController = {
  async placeOrder(req, res, next) {
    const { user, cart, billingDetails } = req.body._value;

    const order = new Order({
      userId: user.userId,
      orderedItems: cart,
      billingDetail: {
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        address: billingDetails.address,
        state: billingDetails.state,
        postalCode: billingDetails.postalCode,
        email: billingDetails.email,
        phone: billingDetails.phone,
        orderNotes: billingDetails.orderNotes,
      },
    });
    let confirmedOrder;
    try {
      confirmedOrder = await order.save();
    } catch (error) {
      next(error);
    }

    const orderId = confirmedOrder._id;

    res.status(200).json({ orderId });
  },

  async getOrders(req, res, next) {
    let orders;
    try {
      orders = await Order.find({ userId: req.user._id });
    } catch (error) {
      return next(error);
    }
    res.status(200).json({ orders });
  },
};

export default orderController;
