<template>
  <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
    <RouterLink :to="`/shopsingle/${bookId}`">
      <div class="card">
        <figure class="block-4-image" style="height: 250px">
          <img :src="imgurl" class="card-img-top h-100" alt="BookImage" />
        </figure>

        <div class="card-body pt-0">
          <h5
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            "
          >
            {{ name }}
          </h5>

          <p class="mb-0">{{ author }}</p>
          <p class="text-primary font-weight-bold mb-0">$ {{ price }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const book = defineProps(["bookId", "imgurl", "name", "author", "price"]);
</script>

<style scoped></style>
