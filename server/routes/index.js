import express from "express";
import { auth, admin } from "../middlewares";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { verifyEmail, sendEmail } from "../controllers/auth/verifyEmail";
import { changePassword } from "../controllers/auth/changePassword";
import { tokenRefresh } from "../controllers/auth/tokenRefresh";
import { logout } from "../controllers/auth/logout";
import { contactUs } from "../controllers/contactUs";
import { getUserById, editUser, deleteUser } from "../controllers/user";
import { getAllOrders, placeOrder } from "../controllers/order";
import {
  getBookById,
  getAllBooks,
  getBestSellingBooks,
  addBook,
  deleteBook,
} from "../controllers/book";

const router = express.Router();

router.post("/signup", signup, sendEmail);
router.get("/verify/:emailtoken", verifyEmail);
router.post("/refresh", tokenRefresh);
router.post("/forgotpassword", sendEmail);
router.post("/login", login);
router.post("/changepassword", auth, changePassword);
router.post("/logout", logout);
router.post("/contactus", contactUs);

router.get("/user", auth, getUserById);
router.post("/updateemail", auth, editUser);
router.get("/deleteuser", auth, deleteUser);

router.get("/book/:bookid", getBookById);
router.get("/bestsellingbooks", getBestSellingBooks);

router.post("/addbook", [auth, admin], addBook);
router.delete("/deletebook/:bookid", [auth, admin], deleteBook);

// Not Tested
router.post("/shop/:currentPage", getAllBooks);
router.get("/getorders", auth, getAllOrders);
router.post("/placeorder", auth, placeOrder);

export default router;
