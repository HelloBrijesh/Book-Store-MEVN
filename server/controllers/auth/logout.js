import { RefreshToken } from "../../models/refreshToken";
import { customErrorHandler } from "../../services";
export const logout = async (req, res, next) => {
  // Accessing the refresh token from cookie
  let cookieToken = req.headers.cookie;
  if (!cookieToken) {
    return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
  }

  const cookieRefreshtoken = cookieToken.split("=")[1];

  // Deleting refresh_token from database
  try {
    await RefreshToken.deleteOne({ savedRefreshToken: cookieRefreshtoken });
  } catch (err) {
    return next(new Error("Something went wrong in the database"));
  }

  // Deleting the cookies
  res.status(200).clearCookie("token");

  res.json({ status: "ok" });
};
