import { customErrorHandler } from "../../services";
import { deleteRefreshtoken } from "../../services/tokens";

export const logout = async (req, res, next) => {
  // Accessing the refresh token from cookie
  let cookie = req.headers.cookie;
  if (!cookie) {
    return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
  }

  const refreshTokenInCookie = cookie.split("=")[1];

  // Deleting refresh_token from database
  try {
    await deleteRefreshtoken(refreshTokenInCookie);
  } catch (err) {
    return next(new Error("Something went wrong in the database"));
  }

  // Deleting the cookies
  res.status(200).clearCookie("token");

  res.json({ status: "ok" });
};
