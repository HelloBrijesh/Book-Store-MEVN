import { customErrorHandler } from "../../services";

export const logout = async (req, res, next) => {
  // Accessing the refresh token from cookie
  res.status(200).clearCookie("token");
  let cookie = req.headers.cookie;
  if (!cookie) {
    return next(customErrorHandler.unAuthorized("Invalid Refresh Token"));
  }

  res.json({ status: "ok" });
};
