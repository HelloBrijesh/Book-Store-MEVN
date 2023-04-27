<template>
  <div class="col-md-3 mb-4" data-aos="fade-up">
    <RouterLink :to="`/shopsingle/${bookId}`">
    <div class="item">
      <div class="block-4 text-center">
        <figure class="block-4-image">
            <img :src="imgurl" alt="Image placeholder"  width="150"
            height="200"
            style="object-fit: contain" />
        </figure>        
        <div class="block-4-text p-4">
          <h3>{{ name }}</h3>
          <p class="mb-0">{{ author }}</p>
          <p class="text-primary font-weight-bold">$ {{ price }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
const book = defineProps(["bookId","imgurl", "name", "author", "price"]);
</script>

<style scoped></style>
