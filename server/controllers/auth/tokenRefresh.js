import jwt from "jsonwebtoken";
import { customErrorHandler } from "../../services";
import {
  createAccessToken,
  createRefreshToken,
  deleteRefreshtoken,
  getRefreshToken,
  saveRefreshToken,
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
    // Finding the refresh_token in database
    let refreshTokenExists = await getRefreshToken(refreshTokenInCookie);
    if (!refreshTokenExists) {
      return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
    }

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
      return next(customErrorHandler.notFound("User Not found!"));
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

    // Adding new refresh_token in database
    await saveRefreshToken(refresh_token);

    // Deleting the old refresh_token from database
    await deleteRefreshtoken(refreshTokenInCookie);

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
