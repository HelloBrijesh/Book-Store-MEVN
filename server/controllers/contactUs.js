import Joi from "joi";
import { customErrorHandler } from "../services";
import { sendEmail } from "../services/email";

export const contactUs = async (req, res, next) => {
  // Validating the user Input
  const contactUsSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  const { error } = contactUsSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { name, email, message } = req.body;

  try {
    const emailSubject = "Contact Us";
    const emailText = `
                      Name : ${name}
                      email: ${email}
                      message :${message}
                      `;

    await sendEmail(email, emailSubject, emailText);
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};
