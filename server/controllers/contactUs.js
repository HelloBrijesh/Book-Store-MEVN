import Joi from "joi";
import nodemailer from "nodemailer";
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
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });

  const { error } = contactUsSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { firstName, lastName, email, subject, message } = req.body;

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
      to: "techpradhyapak@gmail.com",
      subject: `Contact Us - ${subject}`,
      text: `
          Name : ${firstName} ${lastName}
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
