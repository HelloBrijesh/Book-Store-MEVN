import Joi from "joi";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../services";
import {
  getUserById,
  updateUserById,
  updatePasswordByUserId,
} from "../services/user";
import { User } from "../models/user";
export const fetchUser = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const userDetails = await getUserById(userId);
    if (!userDetails) {
      return next(customErrorHandler.notFound("User Not Found"));
    }
    res.json({ userDetails, status: "ok" });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.user.userId;

  const userSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    firstName: Joi.string().allow(""),
    lastName: Joi.string().allow(""),
    email: Joi.string().email().required(),
    imageUrl: Joi.string().allow(""),
    imageName: Joi.string().allow(""),
  });

  const { error } = userSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { userName, firstName, lastName, email, imageUrl, imageName } =
    req.body;

  try {
    const updatedUser = await updateUserById(
      userId,
      userName,
      firstName,
      lastName,
      email,
      imageUrl,
      imageName
    );
    res.status(200).json({ updatedUser, status: "ok" });
  } catch (error) {
    return next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  const userId = req.user.userId;
  const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string().min(8).required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  const { error } = updatePasswordSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { currentPassword, newPassword } = req.body;
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return next(customErrorHandler.wrongCredentials());
    }
    const verifyPassword = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!verifyPassword) return next(customErrorHandler.wrongCredentials());
  } catch (error) {
    return next(error);
  }

  try {
    const COST_FACTOR = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, COST_FACTOR);
    await updatePasswordByUserId(userId, newHashedPassword);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {};
