<script setup>
import { onMounted } from "vue";
import useBookService from "../services/bookService";
import { RouterLink } from "vue-router";

const { getBestSellingBooks, error, status, listOfBooks } = useBookService();

onMounted(async () => {
  await getBestSellingBooks();
});
</script>
<template>
  <div class="container mx-auto pb-32">
    <div class="pb-20">
      <h2 class="text-3xl font-bold text-black">Bestselling Books</h2>
    </div>
    <div class="flex justify-between gap-2">
      <RouterLink
        :to="`/book/${book.id}`"
        v-for="book in listOfBooks"
        :key="book.id"
        class="rounded-md border basis-1/3"
      >
        <img
          :src="book.image"
          alt="Laptop"
          class="h-[300px] w-full rounded-t-md object-cover"
        />
        <div class="p-4">
          <h1 class="inline-flex items-center text-lg font-semibold">
            {{ book.title }}
          </h1>
          <p class="mt-3 text-sm text-gray-600">{{ book.author }}</p>
          <button
            type="button"
            class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add to Cart
          </button>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
