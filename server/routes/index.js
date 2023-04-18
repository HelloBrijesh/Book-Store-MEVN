import express from "express";
import { auth, admin } from "../middlewares";
import {
  signupController,
  loginController,
  refreshController,
  userController,
  logoutController,
  adminController,
  shopController,
  bookDetailsController,
  orderController,
} from "../controllers";

const router = express.Router();

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.post("/logout", logoutController.logout);
router.post("/refresh", refreshController.refresh);

router.get("/user", auth, userController.user);
router.get("/getorders", auth, orderController.getOrders);

router.post("/shop/:currentPage", shopController.shop);
router.get("/bookdetails/:bookid", bookDetailsController.getbook);
router.post("/placeorder", auth, orderController.placeOrder);

router.post("/admin", [auth, admin], adminController.addBook);

export default router;
