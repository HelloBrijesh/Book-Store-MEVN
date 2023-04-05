import express from "express";
import { auth } from "../middlewares";
import {
  signupController,
  loginController,
  refreshController,
  userController,
  logoutController,
} from "../controllers";

const router = express.Router();

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.post("/logout", logoutController.logout);
router.post("/refresh", refreshController.refresh);
router.get("/user", auth, userController.user);

export default router;
