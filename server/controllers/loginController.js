import Joi from "joi";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET } from "../config";
import { User, RefreshToken } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const loginController = {
  async login(req, res, next) {
    // Validating the user Input

    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
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
        sameSite: "none",
        path: "/",
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        secure: true,
        domain: "book-store-client-qfmu.onrender.com",
      });

      // Sending userDetail and access_token
      res.json({ access_token, authDetail });
    } catch (err) {
      return next(err);
    }
  },
};

export default loginController;
