import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
} from "../../config";
import { User } from "../../models/user";
import { RefreshToken } from "../../models/refreshToken";
import { customErrorHandler } from "../../services";

export const login = async (req, res, next) => {
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

  const { email, password } = req.body;

  // Finding the user from database

  let access_token;
  let refresh_token;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return next(customErrorHandler.wrongCredentials());
    }
    //comparing the password
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) return next(customErrorHandler.wrongCredentials());
    if (!existingUser.verified) return next(customErrorHandler.notVerified());
    // Creating the Tokens
    access_token = jwt.sign(
      { userId: existingUser.id, role: existingUser.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
    refresh_token = jwt.sign(
      { userId: existingUser.id, role: existingUser.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );

    // Adding refresh token in database
    await RefreshToken.create({ savedRefreshToken: refresh_token });

    // Setting up the cookies
    res.status(200).cookie("token", refresh_token, {
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000000),
      httpOnly: true,
    });
    res.json({ access_token, status: "ok", role: existingUser.role });
  } catch (err) {
    return next(err);
  }
};
