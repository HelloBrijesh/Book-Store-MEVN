import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import UserView from "../views/UserView.vue";
import AboutView from "../views/AboutView.vue";
import ShopView from "../views/ShopView.vue";
import ShopSingleView from "../views/ShopSingleView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import ThankYouView from "../views/ThankYouView.vue";
import ContactView from "../views/ContactView.vue";
import AdminLoginView from "../views/AdminLoginView.vue";
import AdminView from "../views/AdminView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: "/user",
      name: "user",
      component: UserView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/shop",
      name: "shop",
      component: ShopView,
    },
    {
      path: "/shopsingle",
      name: "shopsingle",
      component: ShopSingleView,
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
      path: "/thankyou",
      name: "thankyou",
      component: ThankYouView,
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/adminlogin",
      name: "adminlogin",
      component: AdminLoginView,
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
