<template>
  <div class="col-md-3 mb-4" data-aos="fade-up">
    <div class="item">
      <div class="block-4 text-center">
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
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
const book = defineProps(["imgurl", "name", "author", "price"]);
</script>

<style scoped></style>
