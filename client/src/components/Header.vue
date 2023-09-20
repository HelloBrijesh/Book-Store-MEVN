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
      <div class="flex space-x-3">
        <div>
          <input
            class="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Serach"
          />
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6 cursor-pointer"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="relative ">
    <div class="container mx-auto flex items-center justify-between py-2">
      <div class="inline-flex items-center space-x-2">
        <RouterLink to="/">
          <span class="font-bold">Book Store</span>
        </RouterLink>
      </div>
      <div class="hidden lg:block">
        <ul class="ml-12 inline-flex space-x-8">
          <li>
            <RouterLink
              to="/"
              class="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/shop"
              class="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
            >
              Shop
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/contact"
              class="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
            >
              Contact
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="flex grow justify-end">
        <input
          class="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Serach"
        />
      </div>
      <div class="ml-2 mt-2 hidden lg:block">
        <span class="relative inline-block">
          <img
            class="h-10 w-10 rounded-full"
            src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
            alt="Dan_Abromov"
          />
        </span>
      </div>
      
    </div>
  </div> -->
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
<style scoped></style>
