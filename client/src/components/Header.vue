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
                <li>
                  <RouterLink v-if="userStore.getisLoggedin" to="/user"
                    ><span>Account</span></RouterLink
                  >
                  <RouterLink v-else to="/login"
                    ><span class="icon icon-person"></span
                  ></RouterLink>
                </li>
                <li>
                  <a href="#"><span class="icon icon-heart-o"></span></a>
                </li>
                <li>
                  <a href="/cart" class="site-cart">
                    <span class="icon icon-shopping_cart"></span>
                    <span class="count">{{ totalCartItems }}</span>
                  </a>
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
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useCartStore } from "../stores/cartStore";
import { ref } from "vue";
const userStore = useUserStore();
const cartStore = useCartStore();
const totalCartItems = ref(cartStore.getCartItems.length);
</script>

<style scoped></style>
