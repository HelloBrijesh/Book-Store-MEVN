import { RefreshToken } from "../models";
import { CustomErrorHandler } from "../services";
const logoutController = {
  async logout(req, res, next) {
    // Accessing the refresh token from cookie
    let cookieToken = req.headers.cookie;
    if (!cookieToken) {
      return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"));
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

    res.json({ status: 1 });
  },
};

export default logoutController;
