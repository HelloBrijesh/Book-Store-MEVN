import Joi from "joi";
import nodemailer from "nodemailer";
import { customErrorHandler } from "../services";

import {
  EMAIL_SERVICE,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USERID,
  EMAIL_PASSWORD,
} from "../config";

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
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      secure: EMAIL_SECURE,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERID,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailConfigurations = {
      from: "techpradhyapak@gmail.com",
      to: email,
      subject: `Contact Us`,
      text: `
          Name : ${name}
          email: ${email}
          message :${message}
      `,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};
