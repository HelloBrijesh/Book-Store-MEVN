import { customErrorHandler } from "../services";
import { verifyAccessToken } from "../services/tokens";
const auth = async (req, res, next) => {
  // Accessing the access token from headers

  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(customErrorHandler.unAuthorized("accessToken Required"));
  }
  const authAccessToken = authHeader.split(" ")[1];

  //Verifying the access token
  try {
    const { userId, role } = await verifyAccessToken(authAccessToken);
    const user = {
      userId,
      role,
    };
    req.user = user;
    next();
  } catch (err) {
    return next(customErrorHandler.unAuthorized(err.message));
  }
};

export default auth;

