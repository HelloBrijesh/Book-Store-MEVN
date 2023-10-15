import { User } from "../models/user";
import { customErrorHandler } from "../services";

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.role === "admin") {
      next();
    } else {
      return next(customErrorHandler.unAuthorized());
    }
  } catch (err) {
    return next(customErrorHandler.serverError(err.message));
  }
};

export default admin;
