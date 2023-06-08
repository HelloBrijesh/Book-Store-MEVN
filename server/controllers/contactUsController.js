import Joi from "joi";
import { CustomErrorHandler, JwtService } from "../services";
import nodemailer from "nodemailer";
import { EMAIL_PORT, USER, PASS, SECURE, SERVICE } from "../config";

const contactUsController = {
  async contactUs(req, res, next) {
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
        service: SERVICE,
        secure: SECURE,
        port: EMAIL_PORT,
        auth: {
          user: USER,
          pass: PASS,
        },
      });

      const mailConfigurations = {
        from: "techpradhyapak@gmail.com",
        to: "techpradhyapak@gmail.com",
        subject: `Contact Us - ${subject}`,
        text: `
            firstName : ${firstName}
            lastName: ${lastName}
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
  },
};

export default contactUsController;
