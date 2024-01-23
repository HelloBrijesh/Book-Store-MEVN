<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import useBookService from "../services/bookService";

const { getBestSellingBooks, error, status, listOfBooks } = useBookService();

onMounted(async () => {
  await getBestSellingBooks();
});
</script>
<template>
  <div class="w-full mb-16 sm:mb-28">
    <div class="mx-5 sm:container sm:mx-auto">
      <div class="pb-20">
        <h2 class="text-3xl font-bold text-black">Bestselling Books</h2>
      </div>
      <div v-if="status === null">
        <h1 class="text-center font-semibold">Loading...</h1>
      </div>
      <div v-else-if="error">
        <h1 class="text-center text-red-500">Error</h1>
      </div>
      <div v-else class="grid sm:grid-cols-4 grid-flow-row gap-6">
        <div
          v-for="book in listOfBooks"
          class="grow border rounded-lg overflow-hidden"
        >
          <RouterLink :to="`/book/${book.id}`">
            <figure class="h-[300px]">
              <img :src="book.imageUrl" alt="Laptop" class="h-full w-full" />
            </figure>
            <div class="p-4 pb-0">
              <h1
                class="font-semibold text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {{ book.title }}
              </h1>
              <p
                class="text-sm text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {{ book.author }}
              </p>
              <p>Price : $ {{ book.price }}</p>
            </div>
            <button
              type="button"
              class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Cart
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
