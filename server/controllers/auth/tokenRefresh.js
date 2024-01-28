import jwt from "jsonwebtoken";
import { customErrorHandler } from "../../services";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../../services/tokens";
import { getUserById } from "../../services/user";

export const tokenRefresh = async (req, res, next) => {
  // Accessing the refresh token from cookie
  let cookie = req.headers.cookie;
  if (!cookie) {
    return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
  }
  const refreshTokenInCookie = cookie.split("=")[1];
  try {
    let userId;
    try {
      const tokenData = await verifyRefreshToken(refreshTokenInCookie);
      userId = tokenData.userId;
    } catch (err) {
      return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
    }

    // Finding the user from database
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return next(customErrorHandler.notFound("Invalid Refresh Token"));
    }

    // Creating new Tokens
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
