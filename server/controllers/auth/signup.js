import Joi from "joi";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../services";
import { createUser, getUserByEmail } from "../../services/user";
import { createCartByUserId } from "../../services/cart";
import { createRefreshToken, saveEmailToken } from "../../services/tokens";
import { sendEmail } from "../../services/email";
import { CLIENT_URL } from "../../config";

export const signup = async (req, res, next) => {
  // Validating the user Input

  const signupSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
    // confirmPassword: Joi.ref("password"),
  });

  const { error } = signupSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const { userName, email, password } = req.body;

  //Check if the user is already registered

  try {
    const userExist = await getUserByEmail(email);

    if (userExist) {
      return next(
        customErrorHandler.alreadyExists("This email is already exists")
      );
    }
  } catch (error) {
    return next(error);
  }

  // Hashing the password
  const COST_FACTOR = 10;
  const hashedPassword = await bcrypt.hash(password, COST_FACTOR);

  // Preparing the model

  try {
    const createdUser = await createUser(userName, email, hashedPassword);

    await createCartByUserId(createdUser.id);

    const verificationToken = await createRefreshToken(
      createdUser.id,
      createdUser.role
    );

    const tokenForemail = (
      await bcrypt.hash(verificationToken, COST_FACTOR)
    ).replace(/[^a-zA-Z0-9]/g, "");

    const emailSubject = "Email Verification from Book-Store";
    const emailText = `Hi! There, You have recently visited 
    our Bookstore website and entered your email.
    Please follow the given link to verify your email
    ${CLIENT_URL}/verifyemail/${tokenForemail}
    Thanks`;

    await sendEmail(email, emailSubject, emailText);
    await saveEmailToken(createdUser.id, tokenForemail);
  } catch (err) {
    return next(err);
  }

  res.json({ status: "ok" });
};
