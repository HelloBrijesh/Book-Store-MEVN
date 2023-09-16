import { User } from "../models/user";
import { customErrorHandler } from "../services";

export const getUserById = async (req, res, next) => {
  //Finding user datails from database
  try {
    const user = await User.findOne({ id: req.user.userId }).select(
      "-password -updatedAt -__V"
    );

    if (!user) {
      return next(customErrorHandler.notFound("User Not Found"));
    }

    const userDetail = {
      userId: user.id,
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
};

export const deleteUser = async (req, res, next) => {};
export const editUser = async (req, res, next) => {};
