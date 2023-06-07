<template>
  <header class="site-navbar" role="banner">
    <div class="site-navbar-top">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left"
          >
            <form action="" class="site-block-top-search">
              <span class="icon icon-search2"></span>
              <input
                type="text"
                class="form-control border-0"
                placeholder="Search"
              />
            </form>
          </div>

          <div
            class="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center"
          >
            <div class="site-logo">
              <RouterLink to="/" class="js-logo-clone">Book Store</RouterLink>
            </div>
          </div>

          <div class="col-6 col-md-4 order-3 order-md-3 text-right">
            <div class="site-top-icons">
              <ul>
                <li v-if="authStore.getisLoggedin">
                  <RouterLink to="#" @click="handleLogout()"
                    ><span>Log Out</span></RouterLink
                  >
                </li>
                <li>
                  <RouterLink v-if="authStore.getisLoggedin" to="/user">
                    <img src="/images/avatar.png" width="40" height="40" alt=""
                  /></RouterLink>
                  <RouterLink v-else to="/login"
                    ><span class="icon icon-person"></span
                  ></RouterLink>
                </li>
                <!-- <li>
                  <RouterLink to="#"
                    ><span class="icon icon-heart-o"></span
                  ></RouterLink>
                </li> -->
                <li>
                  <RouterLink to="/cart" class="site-cart">
                    <span class="icon icon-shopping_cart"></span>
                    <span class="count">{{ totalCartItems }}</span>
                  </RouterLink>
                </li>

                <li class="d-inline-block d-md-none ml-md-0">
                  <a href="#" class="site-menu-toggle js-menu-toggle"
                    ><span class="icon-menu"></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="site-navigation text-right text-md-center" role="navigation">
      <div class="container">
        <ul class="site-menu js-clone-nav d-none d-md-block">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li class="">
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li>
            <RouterLink to="/shop">Shop</RouterLink>
          </li>
          <!-- <li><a href="#">Catalogue</a></li>
            <li><a href="#">New Arrivals</a></li> -->
          <li>
            <RouterLink to="/contact">Contact</RouterLink>
          </li>
          <li v-if="session">
            <RouterLink to="/admin" v-if="session.role === 'admin'"
              >Manage Store</RouterLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { useUserStore } from "../stores/userStore";
import { useOrderStore } from "../stores/orderStore";
import useAuthService from "../services/authService";

const { logout, error, statusCode } = useAuthService();

const authStore = useAuthStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const orderStore = useOrderStore();

const totalCartItems = ref(cartStore.getCartItems.length);
const session = authStore.getSessionDetails;

const handleLogout = async () => {
  await logout();
  authStore.$reset();
  userStore.$reset();
  orderStore.$reset();
  cartStore.$reset();
  window.location.href = "/login";
};
</script>

<style scoped></style>
