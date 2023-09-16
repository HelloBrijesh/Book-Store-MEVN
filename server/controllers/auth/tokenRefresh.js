import jwt from "jsonwebtoken";
import { RefreshToken } from "../../models/refreshToken";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";
import {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
} from "../../config";

export const tokenRefresh = async (req, res, next) => {
  // Accessing the refresh token from cookie

  let cookieToken = req.headers.cookie;
  if (!cookieToken) {
    return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
  }
  const cookieRefreshtoken = cookieToken.split("=")[1];

  try {
    // Finding the refresh_token in database
    let verifiedRefreshToken = await RefreshToken.findOne({
      savedRefreshToken: cookieRefreshtoken,
    });

    if (!verifiedRefreshToken) {
      return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
    }

    let userId;
    try {
      const tokenData = jwt.verify(cookieRefreshtoken, REFRESH_TOKEN_SECRET);
      userId = tokenData.userId;
    } catch (err) {
      return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
    }

    // Finding the user from database
    const existingUser = await User.findOne({ id: userId });
    if (!existingUser) {
      return next(customErrorHandler.unAuthorized("No user found!"));
    }

    // Creating new Tokens
    const access_token = jwt.sign(
      { userId: existingUser.id, role: existingUser.role },
      ACCESS_TOKEN_SECRET,
      ACCESS_TOKEN_EXPIRY
    );
    const refresh_token = JwtService.sign(
      { userId: existingUser.id, role: existingUser.role },
      REFRESH_TOKEN_SECRET,
      REFRESH_TOKEN_EXPIRY
    );

    // Adding new refresh_token in database
    await RefreshToken.create({ savedRefreshToken: refresh_token });

    // Deleting the old refresh_token from database
    await RefreshToken.deleteOne({ savedRefreshToken: cookieRefreshtoken });

    // Setting up the cookies
    res.status(200).cookie("token", refresh_token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

    // Sending the new access_token
    res.json({ access_token });
  } catch (err) {
    return next(new Error("Something went wrong " + err.message));
  }
};
