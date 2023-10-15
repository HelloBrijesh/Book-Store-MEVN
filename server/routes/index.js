import express from "express";
import { auth, admin } from "../middlewares";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { verifyEmail, sendEmail } from "../controllers/auth/verifyEmail";
import { changePassword } from "../controllers/auth/changePassword";
import { tokenRefresh } from "../controllers/auth/tokenRefresh";
import { logout } from "../controllers/auth/logout";
import { contactUs } from "../controllers/contactUs";
import {
  getUserById,
  updateUserDetails,
  deleteUser,
  updateProfileImage,
} from "../controllers/user";
import { getAllOrders, placeOrder, getSalesData } from "../controllers/order";
import { addSubscriber, removeSubscriber } from "../controllers/subscription";
import {
  getCartItems,
  addItemInCart,
  removeItemFromCart,
} from "../controllers/cart";
import {
  getBookById,
  getAllBooks,
  getBestSellingBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../controllers/book";

const router = express.Router();

router.post("/signup", signup, sendEmail);
router.post("/verify/:emailtoken", verifyEmail);
router.post("/refresh", tokenRefresh);
router.post("/forgotpassword", sendEmail);
router.post("/login", login);
router.post("/changepassword", auth, changePassword);
router.post("/logout", logout);
router.post("/contactus", contactUs);

router.get("/userdetails", auth, getUserById);
router.post("/updateuser", auth, updateUserDetails);
router.post("/updateprofileimage", auth, updateProfileImage);
router.delete("/deleteuser", auth, deleteUser);

router.get("/book/:bookid", getBookById);
router.get("/bestsellingbooks", getBestSellingBooks);

router.post("/addbook", [auth, admin], addBook);
router.post("/updatebook/:bookid", [auth, admin], updateBook);
router.get("/getbooks", [auth, admin], getAllBooks);
router.delete("/deletebook/:bookid", [auth, admin], deleteBook);
router.get("/shop", getAllBooks);

router.get("/getcart", auth, getCartItems);
router.post("/addcartitem", auth, addItemInCart);
router.post("/removecartitem", auth, removeItemFromCart);

router.post("/placeorder", auth, placeOrder);
router.get("/getorders/:page", auth, getAllOrders);
router.get("/salesdata", getSalesData);

router.post("/addsubscriber", addSubscriber);
router.delete("/removesubscriber", removeSubscriber);

export default router;
