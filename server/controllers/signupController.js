import Joi from "joi";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET } from "../config";
import { User, RefreshToken } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const signupController = {
  async signup(req, res, next) {
    const signupSchema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirm_password: Joi.ref("password"),
    });

    const { error } = signupSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { firstName, lastName, email, password } = req.body;

    //check if the user is in database

    try {
      const exist = await User.exists({ email: email });

      if (exist) {
        return next(
          CustomErrorHandler.alreadyExists("this email is already exists")
        );
      }
    } catch (err) {
      return next(err);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the model

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    let access_token;
    let refresh_token;
    let result;
    try {
      result = await user.save();

      // Create Token
      access_token = JwtService.sign({ _id: result._id });
      refresh_token = JwtService.sign(
        { _id: result._id, role: result.role },
        JWT_REFRESH_SECRET,
        "30d"
      );

      // Access Token Added in database
      await RefreshToken.create({ token: refresh_token });
    } catch (err) {
      return next(err);
    }

    res.status(202).cookie("token", refresh_token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    res.json({ access_token, userId: result._id });
  },
};

export default signupController;
