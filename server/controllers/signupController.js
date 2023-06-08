import Joi from "joi";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET } from "../config";
import { User, RefreshToken, EmailToken } from "../models";
import { CustomErrorHandler, JwtService } from "../services";
import nodemailer from "nodemailer";
import { EMAIL_PORT, USER, PASS, SECURE, SERVICE } from "../config";

const signupController = {
  async signup(req, res, next) {
    // Validating the user Input

    const signupSchema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
      verificationReason: Joi.string().required(),
    });

    const { error } = signupSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { firstName, lastName, email, password } = req.body;
    //Check if the user is already registered
    try {
      const userExist = await User.exists({ email: email });

      if (userExist) {
        return next(
          CustomErrorHandler.alreadyExists("This email is already exists")
        );
      }
    } catch (err) {
      return next(err);
    }

    // Hashing the password
    const COST_FACTOR = 10;
    const hashedPassword = await bcrypt.hash(password, COST_FACTOR);

    // Preparing the model
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (err) {
      return next(err);
    }
    req.body.email = email;
    next();
  },

  async sendVerificationEmail(req, res, next) {
    // Practice
    const email = req.body.email;
    const verificationReason = req.body.verificationReason;
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        return next(CustomErrorHandler.notFound("User Not Found"));
      }
    } catch (error) {
      return next(error);
    }

    let emailVerificationToken;
    try {
      const verificationToken = JwtService.sign(
        {
          _id: existingUser._id,
          role: existingUser.role,
        },
        JWT_REFRESH_SECRET,
        "30d"
      );

      const COST_FACTOR = 10;
      emailVerificationToken = (
        await bcrypt.hash(verificationToken, COST_FACTOR)
      ).replace(/[^a-zA-Z0-9 ]/g, "");
    } catch (error) {
      return next(error);
    }

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
        to: email,
        subject: "Email Verification",
        text: `Hi! There, You have recently visited 
           our Bookstore website and entered your email.
           Please follow the given link to verify your email
           http://localhost:5173/verifyemail/${emailVerificationToken}
           Thanks`,
      };

      transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
          console.log(error);
        }
      });
    } catch (error) {
      return next(error);
    }

    const emailToken = new EmailToken({
      emailToken: emailVerificationToken,
      verificationReason: verificationReason,
      userId: existingUser._id,
    });

    try {
      await emailToken.save();
    } catch (error) {
      next(error);
    }

    res.json({ status: "ok" });
  },

  async verifyEmail(req, res, next) {
    const emailVerificationToken = req.params.emailverificationtoken;
    let verificationDetail;
    try {
      verificationDetail = await EmailToken.findOne({
        emailToken: emailVerificationToken,
      });

      if (!verificationDetail) {
        return next(CustomErrorHandler.notFound("Token does not exists"));
      }

      await User.findByIdAndUpdate(verificationDetail.userId, {
        verified: true,
      });
    } catch (error) {
      return next(error);
    }

    let access_token;
    let refresh_token;
    let authDetail;
    try {
      const { _id, role } = await User.findOne({
        _id: verificationDetail.userId,
      });
      // Creating Tokens
      access_token = JwtService.sign({ _id });
      refresh_token = JwtService.sign(
        {
          _id,
          role,
        },
        JWT_REFRESH_SECRET,
        "30d"
      );

      // Adding refresh_token in Database
      await RefreshToken.create({ savedRefreshToken: refresh_token });

      await EmailToken.deleteOne({
        emailToken: verificationDetail.emailToken,
      });

      authDetail = {
        userId: _id,
        role: role,
      };
    } catch (error) {
      return next(error);
    }

    // await EmailToken.deleteOne({ : cookieRefreshtoken });

    const verificationReason = verificationDetail.verificationReason;
    // Setting up the cookies
    res.status(200).cookie("token", refresh_token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 9000000000),
      httpOnly: true,
    });
    res.json({ access_token, authDetail, verificationReason });
  },
};

export default signupController;
