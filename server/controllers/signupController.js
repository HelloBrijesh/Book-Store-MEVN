import Joi from "joi";
import bcrypt from "bcrypt";
import { JWT_REFRESH_SECRET } from "../config";
import { User, RefreshToken } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const signupController = {
  async signup(req, res, next) {
    // Validating the user Input

    const signupSchema = Joi.object({
      firstName: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Preparing the model
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    let access_token;
    let refresh_token;
    let registeredUser;
    try {
      registeredUser = await user.save();

      // Creating Tokens
      access_token = JwtService.sign({ _id: registeredUser._id });
      refresh_token = JwtService.sign(
        { _id: registeredUser._id, role: registeredUser.role },
        JWT_REFRESH_SECRET,
        "30d"
      );

      // Adding refresh_token in Database
      await RefreshToken.create({ savedRefreshToken: refresh_token });
    } catch (err) {
      return next(err);
    }

    const userDetail = {
      userId: registeredUser._id,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      email: registeredUser.email,
      role: registeredUser.role,
    };

    // Setting up the cookies
    res.status(200).cookie("token", refresh_token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    // sending the user data and access_token
    res.json({ access_token, userDetail });
  },
};

export default signupController;
