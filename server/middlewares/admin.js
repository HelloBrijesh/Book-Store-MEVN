import { customErrorHandler } from "../services";
import { getUserById } from "../services/user";

const admin = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.userId);
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

