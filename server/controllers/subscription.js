import Joi from "joi";
import {
  addSubscriberByEmail,
  getSubcriberByEmail,
  removeSubscriberByEmail,
} from "../services/subscription";

export const addSubscriber = async (req, res, next) => {
  const addSubscriberSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = addSubscriberSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email } = req.body;

  try {
    const emailExists = await getSubcriberByEmail(email);
    if (emailExists) return next(error);

    await addSubscriberByEmail(email);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: "ok" });
};

export const removeSubscriber = async (req, res, next) => {
  const removeSubscriberSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = removeSubscriberSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email } = req.body;

  try {
    await removeSubscriberByEmail(email);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ status: "ok" });
};
