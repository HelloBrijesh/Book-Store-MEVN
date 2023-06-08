import Joi from "joi";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET } from "../config";
import { User, RefreshToken, Book } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const loginController = {
  async login(req, res, next) {
    // Validating the user Input

    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      verificationReason: Joi.string().required(),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // Finding the user from database

    let access_token;
    let refresh_token;
    let user;
    try {
      user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      //comparing the password
      const verifyPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!verifyPassword) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      if (!user.verified) {
        return res.json({ verified: false });
      }
      // Creating the Tokens
      access_token = JwtService.sign({ _id: user._id, role: user.role });
      refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        JWT_REFRESH_SECRET,
        "30d"
      );

      // Adding refresh token in database
      await RefreshToken.create({ savedRefreshToken: refresh_token });

      const authDetail = {
        userId: user._id,
        role: user.role,
      };

      // Setting up the cookies
      res.status(200).cookie("token", refresh_token, {
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 900000000),
        httpOnly: true,
      });
      res.json({ access_token, authDetail, verified: true });
    } catch (err) {
      return next(err);
    }
  },

  async changePassword(req, res, next) {
    // Validating the user Input

    const changePasswordSchema = Joi.object({
      password: Joi.string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { password } = req.body;
    const COST_FACTOR = 10;
    const newPassword = await bcrypt.hash(password, COST_FACTOR);

    const userId = req.user._id;
    let existingUser;
    try {
      existingUser = await User.findOne({ _id: userId });

      if (!existingUser) {
        return next(CustomErrorHandler.wrongCredentials());
      }

      await User.findByIdAndUpdate(userId, {
        password: newPassword,
      });
    } catch (error) {
      next(error);
    }
    res.json({ status: "ok" });
  },
};

export default loginController;
