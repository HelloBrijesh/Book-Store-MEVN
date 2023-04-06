import { User } from "../models";
import { CustomErrorHandler } from "../services";

const userController = {
  async user(req, res, next) {
    //Finding user datails from database
    try {
      const user = await User.findOne({ _id: req.user._id }).select("-password -updatedAt -__V");

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
};

export default userController;
