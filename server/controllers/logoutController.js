import { RefreshToken } from "../models";

const logoutController = {
  async logout(req, res, next) {
    let authHeader = req.headers.cookie;
    const token = authHeader.split("=")[1];

    try {
      await RefreshToken.deleteOne({ token: token });
    } catch (err) {
      return next(new Error("Something went wrong in the database"));
    }

    res.status(202).clearCookie("token");

    res.json({ status: 1 });
  },
};

export default logoutController;
