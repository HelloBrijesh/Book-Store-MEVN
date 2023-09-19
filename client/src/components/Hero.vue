<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="relative w-full pb-32">
    <div class="relative z-0 bg-white px-6 pt-14 lg:px-8">
      <div class="relative mx-auto max-w-2xl py-24">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Lorem ipsum dolor sit amet consectetur dicta.
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
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
  </div>
</template>
