import express from "express";
import { auth, admin } from "../middlewares";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { verifyEmail } from "../controllers/auth/verifyEmail";
import { tokenRefresh } from "../controllers/auth/tokenRefresh";
import { logout } from "../controllers/auth/logout";
import { contactUs } from "../controllers/contactUs";
import {
  fetchUser,
  updateUser,
  updatePassword,
  deleteUser,
} from "../controllers/user";
import { getOrders, placeOrder, getSalesData } from "../controllers/order";
import { addSubscriber, removeSubscriber } from "../controllers/subscription";
import {
  fetchCart,
  addItemInCart,
  deleteItemFromCart,
} from "../controllers/cart";
import {
  fetchBookById,
  fetchBooks,
  fetchBestSellingBooks,
  addBook,
  deleteBook,
  updateBook,
} from "../controllers/book";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/logout", logout);
router.get("/refresh", tokenRefresh);
router.post("/email", verifyEmail);

router.get("/user", auth, fetchUser);
router.put("/user", auth, updateUser);
router.put("/user/password", auth, updatePassword);
router.delete("/user", auth, deleteUser);

router.get("/books", fetchBooks);
router.get("/books/:id", fetchBookById);
router.get("/books/list/best-selling", fetchBestSellingBooks);
router.post("/books", [auth, admin], addBook);
router.put("/books/:id", [auth, admin], updateBook);
router.delete("/books/:id", [auth, admin], deleteBook);

router.get("/cart", auth, fetchCart);
router.put("/cart/item", auth, addItemInCart);
router.delete("/cart/item", auth, deleteItemFromCart);

router.get("/orders", auth, getOrders);
router.post("/orders", auth, placeOrder);
router.get("/orders/sales", [auth, admin], getSalesData);

router.post("/subscribers", addSubscriber);
router.delete("/subscribers", removeSubscriber);
router.post("/contact", contactUs);

export default router;
