import nodemailer from "nodemailer";

import {
  EMAIL_SERVICE,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USERID,
  EMAIL_PASSWORD,
} from "../config";

export const sendEmail = async (email, subject, text) => {
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
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      return error;
    }
  });
};
