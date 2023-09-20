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
  <div class="w-full">
    <div class="container mx-auto">
      <div class="pb-20">
        <h2 class="text-3xl font-bold text-black">Bestselling Books</h2>
      </div>

      <div class="grid grid-cols-4 gap-6 mb-40">
        <div
          v-for="book in listOfBooks"
          class="grow border rounded-lg overflow-hidden"
        >
          <RouterLink :to="`/book/${book.id}`">
            <figure class="h-[300px]">
              <img :src="book.image" alt="Laptop" class="h-full w-full" />
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
  <!-- <div cass="container mx-auto pb-32">
    
    <div class="">
      <div
        v-for="book in listOfBooks"
        class="rounded-md border flex flex-col items-center w-1/4"
      >
        <RouterLink :to="`/book/${book.id}`">
          <img
            :src="book.image"
            alt="Laptop"
            class="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          />
          <div class="p-4">
            
            <p class="mt-3 text-sm text-gray-600">{{ book.author }}</p>
            <p>Price : $ {{ book.price }}</p>
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
  </div> -->
</template>
