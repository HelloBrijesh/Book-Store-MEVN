import { User } from "../models";
import { CustomErrorHandler } from "../services";

const userController = {
  async user(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updatedAt -__V"
      );

      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.json({ userDetail: user });
    } catch (err) {
      return next(err);
    }
  },
};

export default userController;
