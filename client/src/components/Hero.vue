<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="w-full mb-20">
    <div class="container mx-auto">
      <div class="text-center max-w-2xl mx-auto py-20">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-6xl">
          Lorem ipsum dolor sit amet consectetur dicta.
        </h1>
        <p class="mt-6 text-lg text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
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
