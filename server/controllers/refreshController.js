import { JWT_REFRESH_SECRET } from "../config";
import { RefreshToken, User } from "../models";
import { CustomErrorHandler, JwtService } from "../services";

const refreshController = {
  async refresh(req, res, next) {
    let authHeader = req.headers.cookie;
    const token = authHeader.split("=")[1];
    console.log(token);

    try {
      let refreshtoken = await RefreshToken.findOne({ token: token });

      if (!refreshtoken) {
        return next(CustomErrorHandler.unAuthorised("Invalid Refresh Token"));
      }

      let userId;
      try {
        const { _id } = await JwtService.verify(
          refreshtoken.token,
          JWT_REFRESH_SECRET
        );
        userId = _id;
      } catch (err) {
        return next(CustomErrorHandler.unAuthorised("Invalid Refresh Token"));
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomErrorHandler.unAuthorized("No user found!"));
      }

      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        JWT_REFRESH_SECRET,
        "1y"
      );

      await RefreshToken.create({ token: refresh_token });
      await RefreshToken.deleteOne({ token: token });

      res.status(202).cookie("token", refresh_token, {
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(new Error("Something went wrong " + err.message));
    }
  },
};

export default refreshController;
