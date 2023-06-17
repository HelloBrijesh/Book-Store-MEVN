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
  contactUsController,
} from "../controllers";

const router = express.Router();

router.post(
  "/signup",
  signupController.signup,
  signupController.sendVerificationEmail
);
router.post("/sendverificationemail", signupController.sendVerificationEmail);
router.get(
  "/verifyemail/:emailverificationtoken",
  signupController.verifyEmail
);
router.post("/login", loginController.login);
router.post("/changepassword", auth, loginController.changePassword);
router.post("/logout", logoutController.logout);
router.post("/refresh", refreshController.refresh);

router.get("/user", auth, userController.user);
router.post("/updateemail", auth, userController.updateEmail);
router.get("/deleteuser", auth, userController.deleteUser);
router.get("/getorders", auth, orderController.getOrders);

router.get("/bestsellingbooks", shopController.bestSellingBooks);
router.post("/shop/:currentPage", shopController.shop);
router.get("/bookdetails/:bookid", bookDetailsController.getbook);
router.post("/placeorder", auth, orderController.placeOrder);
router.post("/contactus", contactUsController.contactUs);

router.post("/admin", [auth, admin], adminController.addBook);
router.delete("/deletebook/:bookid", [auth, admin], adminController.deleteBook);

export default router;
