import Joi from "joi";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../services";
import {
  getUserById,
  updateUserById,
  updatePasswordByUserId,
} from "../services/user";

export const fetchUser = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const userDetails = await getUserById(userId);

    if (!userDetails) {
      return next(customErrorHandler.notFound("User Not Found"));
    }
    // sending user Datails
    res.json({ userDetails, status: "ok" });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const userId = req.user.userId;

  const { userName, firstName, lastName, email, image } = req.body;

  try {
    await updateUserById(userId, userName, firstName, lastName, email, image);
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const updatePassword = async () => {
  const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,15}$"
        )
      )
      .required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,15}$"
        )
      )
      .required(),
  });

  const { error } = updatePasswordSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const existingUser = await getUserById(userId);
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
  } catch (error) {
    next(error);
  }
  res.json({ status: "ok" });
};

export const deleteUser = async (req, res, next) => {};
