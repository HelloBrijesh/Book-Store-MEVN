import { User, RefreshToken } from "../models";
import { CustomErrorHandler } from "../services";

const userController = {
  async user(req, res, next) {
    //Finding user datails from database
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt -__V"
      );

      if (!user) {
        return next(CustomErrorHandler.notFound("User Not Found"));
      }

      const userDetail = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      // sending user Datails
      res.json({ userDetail });
    } catch (err) {
      return next(err);
    }
  },
  async updateEmail(req, res, next) {
    //Finding user datails from database

    const newEmail = req.body.email;

    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt -__V"
      );

      if (!user) {
        return next(CustomErrorHandler.notFound("User Not Found"));
      }

      await User.findByIdAndUpdate(user._id, {
        verified: false,
        email: newEmail,
      });
      // sending user Datails
      res.json({ status: "ok" });
    } catch (err) {
      return next(err);
    }
  },
  async deleteUser(req, res, next) {
    //Finding user datails from database
    try {
      await User.deleteOne({
        _id: req.user._id,
      });
    } catch (err) {
      return next(err);
    }

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
    res.json({ status: "ok" });
  },
};

export default userController;
