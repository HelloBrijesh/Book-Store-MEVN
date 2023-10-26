import { Subscriber } from "../models/subscriber";

export const addSubscriberByEmail = async (email) => {
  try {
    const newSubscriber = new Subscriber({ email: email });
    await newSubscriber.save();
  } catch (error) {
    return error;
  }
};

export const removeSubscriberByEmail = async (email) => {
  try {
    await Subscriber.deleteOne({ email: email });
  } catch (error) {
    return error;
  }
};

export const getSubcriberByEmail = async (email) => {
  try {
    await Subscriber.exists({ email: email });
  } catch (error) {
    return error;
  }
};
