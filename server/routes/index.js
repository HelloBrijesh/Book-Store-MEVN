import express from "express";
import { auth, admin } from "../middlewares";
import {
  signupController,
  loginController,
  refreshController,
  userController,
  logoutController,
  adminController,
  adminLoginController,
  adminLogoutController,
  shopController,
} from "../controllers";

const router = express.Router();

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.post("/logout", logoutController.logout);
router.post("/refresh", refreshController.refresh);
router.get("/user", auth, userController.user);

router.post("/shop", shopController.shop);

router.post("/adminlogin", adminLoginController.login);
router.post("/adminlogout", adminLogoutController.logout);
router.post("/admin", [auth, admin], adminController.addBook);

export default router;
