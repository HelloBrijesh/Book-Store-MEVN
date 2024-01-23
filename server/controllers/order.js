import {
  createOrder,
  getSalesDataByDate,
  getOrdersByUserId,
  getOrdersByOrderId,
  paymentStatus,
} from "../services/order";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

export const placeOrder = async (req, res, next) => {
  const userId = req.user.userId;
  const orderedItems = req.body.orderedItems;
  const orderTotal = req.body.orderTotal;
  const address = req.body.shippingAddress;
  try {
    const createdOrder = await createOrder(
      userId,
      orderTotal,
      orderedItems,
      address
    );
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      client_reference_id: createdOrder.id,
      line_items: createdOrder.orderedItems.map((item) => {
        return {
          price_data: {
            currency: "USD",
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              images: [item.imageUrl],
            },
          },
          quantity: item.quantity,
        };
      }),
      payment_intent_data: {
        metadata: {
          oderId: createdOrder.id,
        },
      },
      success_url: `${process.env.CLIENT_URL}/order/${createdOrder.id}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel-payment`,
    });
    res.status(200).json({ status: "ok", createdOrder, url: session.url });
  } catch (error) {
    next(error);
  }
};
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const payload = req.body;
    const payloadString = JSON.stringify(payload, null, 2);

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        header,
        endpointSecret
      );
    } catch (err) {
      if (err instanceof Error) {
        response.status(400).send(`Webhook Error: ${err.message}`);
      }
      return;
    }

    let orderId;

    switch (event.type) {
      case "charge.succeeded":
        break;
      case "checkout.session.completed":
        break;
      case "payment_intent.created":
        break;
      case "payment_intent.succeeded":
        orderId = event.data.object.metadata.oderId;
        await paymentStatus(orderId, "Paid");
        break;
      default:
        orderId = event.data.object.metadata.oderId;
        await paymentStatus(orderId, "Error");
    }

    res.status(200).send().end();
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  let userId = req.user.userId;
  let currentPage = req.query.currentpage;

  if (req.query.orderId !== "") {
    const orders = await getOrdersByOrderId(req.query.orderId);
    res.status(200).json({ orders, status: "ok" });
  } else {
    try {
      const { orders, totalOrders } = await getOrdersByUserId(
        userId,
        currentPage
      );

      res.status(200).json({ orders, totalOrders, status: "ok" });
    } catch (error) {
      return next(error);
    }
  }
};

export const getSalesData = async (req, res, next) => {
  try {
    let { startDate, endDate, page } = req.query;
    let limit = 5;
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
      page,
      limit
    );

    //Handle responses
    if (!salesData) {
      return res.json({
        status: "failure",
      });
    }

    res.status(200).json({ salesData, totalData, status: "ok" });
  } catch (error) {
    return next(error);
  }
};
