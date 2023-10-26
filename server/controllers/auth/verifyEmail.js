import { customErrorHandler } from "../../services";
import {
  createAccessToken,
  createRefreshToken,
  deleteEmailToken,
  getEmailToken,
  saveRefreshToken,
} from "../../services/tokens";
import { getUserById, updateUserVerified } from "../../services/user";

export const verifyEmail = async (req, res, next) => {
  const emailToken = req.query.token;
  let emailTokenDetails;
  try {
    emailTokenDetails = await getEmailToken(emailToken);

    if (!emailTokenDetails) {
      return next(customErrorHandler.notFound("Token does not exists"));
    }

    await updateUserVerified(emailTokenDetails.userId);
  } catch (error) {
    return next(error);
  }

  let access_token;
  let refresh_token;
  try {
    const existingUser = await getUserById(emailTokenDetails.userId);
    // Creating Tokens
    access_token = await createAccessToken(existingUser.id, existingUser.role);
    refresh_token = await createRefreshToken(
      existingUser.id,
      existingUser.role
    );

    // Adding refresh_token in Database
    await saveRefreshToken(refresh_token);

    await deleteEmailToken(emailTokenDetails.emailToken);

    // Setting up the cookies
    res.status(200).cookie("token", refresh_token, {
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 900000000),
      httpOnly: true,
    });
    res.json({ access_token, status: "ok" });
  } catch (error) {
    return next(error);
  }
};
