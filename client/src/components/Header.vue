<script setup>
import { RouterLink } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faCartShopping, faBars);
</script>
<template>
  <div class="w-full bg-white border-b">
    <div class="container mx-auto flex items-center h-[60px] justify-between">
      <div class="flex space-x-5">
        <div>
          <RouterLink to="/">
            <span class="font-bold">Book Store</span>
          </RouterLink>
        </div>
        <div>
          <ul class="inline-flex space-x-8">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/shop">Shop</RouterLink></li>
            <li><RouterLink to="/Contact">Contact</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="flex space-x-5 items-center">
        <div>
          <input
            class="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Serach"
          />
        </div>
        <div class="flex items-center">
          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          <div
            class="relative bottom-3 w-[20px] h-[20px] border border-black rounded-full flex justify-center items-center bg-black text-white font-semibold"
          >
            7
          </div>
        </div>
        <div>
          <span class="relative inline-block">
            <img
              class="h-10 w-10 rounded-full"
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt="Dan_Abromov"
            />
          </span>
        </div>
        <div class="ml-2 lg:hidden">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
