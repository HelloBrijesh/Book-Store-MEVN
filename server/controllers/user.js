import { User } from "../models/user";
import { customErrorHandler } from "../services";

export const getUserById = async (req, res, next) => {
  //Finding user datails from database
  const userId = req.user.userId;
  try {
    const userDetails = await User.findById(userId).select(
      "-password -verified -_id -role -updatedAt -__V"
    );

    if (!userDetails) {
      return next(customErrorHandler.notFound("User Not Found"));
    }

    // sending user Datails
    res.json({ userDetails, status: "ok" });
  } catch (err) {
    return next(err);
  }
};

export const updateUserDetails = async (req, res, next) => {
  const userId = req.user.userId;

  const { userName, firstName, lastName, email } = req.body;

  try {
    await User.findByIdAndUpdate(userId, {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};
export const updateProfileImage = async (req, res, next) => {
  const userId = req.user.userId;

  const { image } = req.body;

  try {
    await User.findByIdAndUpdate(userId, {
      image: image,
    });
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};
export const deleteUser = async (req, res, next) => {};
