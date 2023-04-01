<template>
  <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
    <div class="block-4 text-center border">
      <figure class="block-4-image">
        <RouterLink to="/shopsingle">
          <img :src="imgurl" alt="Image placeholder" class="img-fluid" />
        </RouterLink>
      </figure>
      <div class="block-4-text p-4">
        <h3>
          <RouterLink to="/shopsingle">{{ name }}</RouterLink>
        </h3>
        <p class="mb-0">{{ author }}</p>
        <p class="text-primary font-weight-bold">{{ price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const book = defineProps(["imgurl", "name", "author", "price"]);
</script>

<style scoped></style>
