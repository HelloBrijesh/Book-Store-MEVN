import Joi from "joi";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET } from "../config";
import { User, RefreshToken } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const loginController = {
  async login(req, res, next) {
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

    let access_token;
    let refresh_token;

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      //compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      // Create Token
      access_token = JwtService.sign({ _id: user._id, role: user.role });
      refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        JWT_REFRESH_SECRET,
        "1y"
      );

      // Access Token Added in database
      await RefreshToken.create({ token: refresh_token });

      res.status(202).cookie("token", refresh_token, {
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(err);
    }
  },
};

export default loginController;
