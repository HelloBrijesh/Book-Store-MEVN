import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ShopView from "../views/ShopView.vue";
import BookView from "../views/BookView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import OrderView from "../views/OrderView.vue";
import ContactView from "../views/ContactView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import VerifyEmailView from "../views/VerifyEmailView.vue";
import ProfileView from "../views/ProfileView.vue";
import AccountDetails from "../components/AccountDetails.vue";
import ChangePassword from "../components/ChangePassword.vue";
import UserOrders from "../components/UserOrders.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      children: [
        {
          path: "",
          component: AccountDetails,
        },
        {
          path: "changepassword",
          component: ChangePassword,
        },
        {
          path: "userorders",
          component: UserOrders,
        },
      ],
    },
    {
      path: "/book/:bookid",
      name: "book",
      component: BookView,
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/cart",
      name: "Cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactView,
    },
    {
      path: "/404",
      name: "notFound",
      component: NotFoundView,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: ForgotPasswordView,
    },
    {
      path: "/verifyemail/:token",
      name: "verifyemail",
      component: VerifyEmailView,
    },
    {
      // path: '/about',
      // name: 'about',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    },
  ],
});

export default router;
