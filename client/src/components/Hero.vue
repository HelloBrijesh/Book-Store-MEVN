<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="w-full mb-10 sm:mb-20">
    <div class="container sm:mx-auto">
      <div class="text-center mx-5 sm:max-w-2xl sm:mx-auto py-10 sm:py-20">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-6xl">
          Find your next book
        </h1>
        <p class="mt-6 text-lg text-gray-600"></p>
        <div class="mt-10 text-center">
          <RouterLink
            to="/shop"
            class="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Shop Now
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
