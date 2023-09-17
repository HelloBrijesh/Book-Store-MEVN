import { Book } from "../models/book";
import { Order } from "../models/order";
import { customErrorHandler } from "../services";

export const placeOrder = async (req, res, next) => {
  const { user, cart, cartTotal, billingDetails } = req.body._value;

  const order = new Order({
    userId: user.userId,
    orderTotal: cartTotal,
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

  try {
    for (let i = 0; i < req.body._value.cart.length; i++) {
      const currentBook = await Book.findById(req.body._value.cart[i].bookId);

      if (req.body._value.cart[i].quantity > currentBook.quantity) {
        return next(
          customErrorHandler.wrongCredentials(
            "Please enter valid book quantity"
          )
        );
      }

      await Book.findByIdAndUpdate(req.body._value.cart[i].bookId, {
        sold: currentBook.sold + req.body._value.cart[i].quantity,
        quantity: currentBook.quantity - req.body._value.cart[i].quantity,
      });
    }
  } catch (error) {
    return next(error);
  }

  const orderId = confirmedOrder.id;

  res.status(200).json({ orderId });
};

export const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find({ userId: req.user.id });
  } catch (error) {
    return next(error);
  }
  res.status(200).json({ orders });
};
