import { JWT_REFRESH_SECRET } from "../config";
import { RefreshToken, User } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const refreshController = {
  async refresh(req, res, next) {
    // Accessing the refresh token from cookie

    let cookieToken = req.headers.cookie;
    if (!cookieToken) {
      return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"));
    }
    const cookieRefreshtoken = cookieToken.split("=")[1];

    try {
      // Finding the refresh_token in database
      let verifiedRefreshToken = await RefreshToken.findOne({
        savedRefreshToken: cookieRefreshtoken,
      });

      if (!verifiedRefreshToken) {
        return next(CustomErrorHandler.unAuthorised("Invalid Refresh Token"));
      }

      // Verifying the refresh_token
      let userId;
      try {
        const { _id } = JwtService.verify(cookieRefreshtoken, JWT_REFRESH_SECRET);
        userId = _id;
      } catch (err) {
        return next(CustomErrorHandler.unAuthorised("Invalid Refresh Token"));
      }

      // Finding the user from database
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No user found!"));
      }

      // Creating new Tokens
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, JWT_REFRESH_SECRET, "1y");

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
  },
};

export default refreshController;
