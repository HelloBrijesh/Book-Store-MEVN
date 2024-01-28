import Joi from "joi";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../services";
import { getUserByEmail } from "../../services/user";
import { createAccessToken, createRefreshToken } from "../../services/tokens";

export const login = async (req, res, next) => {
  // Validating the user Input

  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { email, password } = req.body;

  // Finding the user from database
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return next(customErrorHandler.unAuthorized(""));
    }
    //comparing the password
    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) return next(customErrorHandler.unAuthorized());
    if (!existingUser.verified)
      return next(customErrorHandler.unAuthorized("Not Verified"));
    // Creating the Tokens
    const access_token = await createAccessToken(
      existingUser.id,
      existingUser.role
    );
    const refresh_token = await createRefreshToken(
      existingUser.id,
      existingUser.role
    );

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
