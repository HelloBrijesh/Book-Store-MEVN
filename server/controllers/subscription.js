import Joi from "joi";
import { Subscriber } from "../models/subscriber";
export const addSubscriber = async (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email } = req.body;

  try {
    const emailExists = await Subscriber.exists({ email: email });
    if (emailExists) return next(error);

    const newSubscriber = new Subscriber({ email: email });
    await newSubscriber.save();
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const removeSubscriber = async (req, res, next) => {
  const email = req.params.email;

  try {
    await Subscriber.deleteOne({ email: email });
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};
