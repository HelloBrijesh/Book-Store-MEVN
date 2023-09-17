import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import { customErrorHandler } from "../../services";

export const signup = async (req, res, next) => {
  // Validating the user Input

  const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmPassword: Joi.ref("password"),
  });

  const { error } = signupSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  const { firstName, lastName, email, password } = req.body;
  //Check if the user is already registered
  try {
    const userExist = await User.exists({ email: email });

    if (userExist) {
      return next(
        customErrorHandler.alreadyExists("This email is already exists")
      );
    }
  } catch (err) {
    return next(err);
  }

  // Hashing the password
  const COST_FACTOR = 10;
  const hashedPassword = await bcrypt.hash(password, COST_FACTOR);

  // Preparing the model
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(err);
  }
  req.body.email = email;
  next();
};
