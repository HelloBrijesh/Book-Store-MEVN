import { Order } from "../models";

const orderController = {
  async placeOrder(req, res, next) {
    const { billingDetails, cart, user } = req.body._value;

    const order = new Order({
      userId: user.userId,
      orderedItems: cart,
      billingDetail: {
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        address: billingDetails.address,
        state: billingDetails.state,
        postalCode: billingDetails.postalCode,
      },
    });
    let confirmedOrder;
    try {
      confirmedOrder = await order.save();
    } catch (error) {
      next(error);
    }

    console.log(confirmedOrder);

    res.status(200).json({ confirmedOrder });
  },
};

export default orderController;
