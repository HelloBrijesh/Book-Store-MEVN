import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";

export const changePassword = async (req, res, next) => {
  // Validating the user Input
  const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

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

    await User.findByIdAndUpdate(userId, {
      password: newHashedPassword,
    });
  } catch (error) {
    next(error);
  }
  res.json({ status: "ok" });
};
