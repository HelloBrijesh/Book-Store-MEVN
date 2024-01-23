<script setup>
import { RouterLink } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import useAuthService from "../services/authService";

library.add(faCartShopping, faBars, faUser);

const authStore = useAuthStore();
const cartStore = useCartStore();
const { error, status, logout } = useAuthService();

const isActive = ref(true);
const isUserActive = ref(true);

onMounted(async () => {});

const handleLogout = async () => {
  await logout();
  if (status.value === "ok") {
    authStore.$reset();
    cartStore.$reset();
  }
};
</script>
<template>
  <div class="w-full bg-white border-b">
    <div
      class="sm:container sm:mx-auto mx-5 flex items-center h-[60px] justify-between"
    >
      <div class="">
        <RouterLink to="/">
          <span class="font-bold">Book Store</span>
        </RouterLink>
      </div>

      <div
        class="absolute md:static px-12 bg-slate-400 md:bg-transparent w-full md:w-auto left-0 top-[60px] md:flex flex-col gap-2 md:flex-row md:space-x-10 md:items-center"
        :class="{ hidden: isActive }"
      >
        <ul class="flex gap-2 flex-col md:flex-row md:space-x-8">
          <li class="py-3 border-b md:border-0">
            <RouterLink
              to="/"
              @click="
                () => {
                  isActive = !isActive;
                }
              "
              class="block"
              >Home</RouterLink
            >
          </li>
          <li class="py-3 border-b md:border-0">
            <RouterLink
              to="/shop"
              @click="
                () => {
                  isActive = !isActive;
                }
              "
              class="block"
              >Shop</RouterLink
            >
          </li>
          <li class="py-3 border-b md:border-0">
            <RouterLink
              to="/Contact"
              @click="
                () => {
                  isActive = !isActive;
                }
              "
              class="block"
              >Contact</RouterLink
            >
          </li>
          <li class="py-3 border-b md:border-0" v-if="authStore.getisAdmin">
            <RouterLink
              to="/admin"
              @click="
                () => {
                  isActive = !isActive;
                }
              "
              class="block"
              >Admin</RouterLink
            >
          </li>
        </ul>
        <RouterLink to="/cart" class="block">
          <div class="flex items-center my-4 md:my-0 py-3 border-b md:border-0">
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            <div
              class="relative bottom-3 w-[20px] h-[20px] border border-black rounded-full flex justify-center items-center bg-black text-white font-semibold"
            >
              {{ cartStore.getTotalItems }}
            </div>
          </div>
        </RouterLink>
        <div class="w-full">
          <span
            class="relative inline-block border-b md:border-0 w-full md:w-auto pb-2 md:pb-0"
            @click="
              () => {
                isUserActive = !isUserActive;
              }
            "
          >
            <img
              v-if="authStore.getUserImage != ''"
              class="h-10 w-10 rounded-full hover:cursor-pointer"
              :src="authStore.getUserImage"
              alt="Dan_Abromov"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-user"
              class="h-5 w-5 hover:cursor-pointer"
            />
          </span>
          <ul
            class="absolute bg-white z-20 left-0 md:left-auto ps-12 md:top-[60px] md:px-3 flex flex-col w-full md:w-auto md:auto border hover:text-black"
            :class="{ 'md:hidden': isUserActive }"
          >
            <RouterLink to="/profile" class="block"
              ><li
                v-if="authStore.getisLoggedin"
                @click="
                  () => {
                    isUserActive = !isUserActive;
                    isActive = !isActive;
                  }
                "
                class="py-3 border-b md:border-0 hover:text-blue-500"
              >
                Profile
              </li></RouterLink
            >
            <RouterLink to="/login" class="block"
              ><li
                v-if="!authStore.getisLoggedin"
                @click="
                  () => {
                    isUserActive = !isUserActive;
                    isActive = !isActive;
                  }
                "
                class="py-3 border-b md:border-0 hover:text-blue-500"
              >
                Login
              </li></RouterLink
            >
            <RouterLink to="/" @click="handleLogout" class="block"
              ><li
                v-if="authStore.getisLoggedin"
                @click="
                  () => {
                    isUserActive = !isUserActive;
                    isActive = !isActive;
                  }
                "
                class="py-3 border-b md:border-0 hover:text-blue-500"
              >
                Logout
              </li></RouterLink
            >
          </ul>
        </div>
      </div>
      <div
        class="ml-2 md:hidden hover:cursor-pointer"
        @click="
          () => {
            isActive = !isActive;
          }
        "
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
