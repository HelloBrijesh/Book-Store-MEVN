import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";

export const changePassword = async (req, res, next) => {
  // Validating the user Input
  const changePasswordSchema = Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  });

  const { error } = changePasswordSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  const { password } = req.body;

  const COST_FACTOR = 10;
  const newPassword = await bcrypt.hash(password, COST_FACTOR);

  const userId = req.user.userId;
  let existingUser;
  try {
    existingUser = await User.findById(userId);

    if (!existingUser) {
      return next(customErrorHandler.wrongCredentials());
    }

    await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
  } catch (error) {
    next(error);
  }
  res.json({ status: "ok" });
};
