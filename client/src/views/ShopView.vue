<script setup>
import { onMounted, ref } from "vue";
import useBookService from "../services/bookService";
import { RouterLink } from "vue-router";

const { error, status, totalPages, listOfBooks, getAllBooks } =
  useBookService();

const shopPayload = ref({
  category: "Romance",
  price: 500,
});
const currentPage = ref(1);

const handlePrevious = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    handlePagination(currentPage.value);
  }
};
const handleNext = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    handlePagination(currentPage.value);
  }
};
const handlePagination = async (page) => {
  currentPage.value = page;
  await getAllBooks(currentPage.value, shopPayload.value);
};
const handleShop = async () => {
  currentPage.value = 1;
  await getAllBooks(currentPage.value, shopPayload.value);
};
onMounted(async () => {
  await getAllBooks(currentPage.value, shopPayload.value);
});
</script>
<template>
  <div class="w-full">
    <div class="mx-5 sm:container sm:mx-auto">
      <div class="flex justify-between border-b-2 py-6 mb-10 mt-5">
        <div class="">
          <h1 class="text-3xl font-semibold">Shop</h1>
        </div>
        <div class="me-10 flex items-center">
          sort
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ml-2 h-4 w-4"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <div class="sm:flex">
        <div class="w-[250px] sm:pt-10 ps-6 mb-10 sm:mb-0">
          <div class="">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">Category</h3>
            <form @change="handleShop">
              <div class="pb-2">
                <input
                  type="radio"
                  id="romance"
                  name="category"
                  class="me-2"
                  value="Romance"
                  v-model="shopPayload.category"
                />
                <label class="" for="romance">Romance</label>
              </div>
              <div class="pb-2">
                <input
                  type="radio"
                  id="literature"
                  name="category"
                  class="me-2"
                  value="Literature"
                  v-model="shopPayload.category"
                />
                <label class="" for="literature">Literature</label>
              </div>
              <div class="pb-2">
                <input
                  type="radio"
                  id="science"
                  name="category"
                  class="me-2"
                  value="Science"
                  v-model="shopPayload.category"
                />
                <label class="" for="science">Science</label>
              </div>
              <div class="pb-2">
                <input
                  type="radio"
                  id="history"
                  name="category"
                  class="me-2"
                  value="History"
                  v-model="shopPayload.category"
                />
                <label class="" for="history">History</label>
              </div>
              <div class="pb-2">
                <input
                  type="radio"
                  id="travel"
                  name="category"
                  class="me-2"
                  value="Travel"
                  v-model="shopPayload.category"
                />
                <label class="" for="travel">Travel</label>
              </div>

              <div class="py-5">
                <h3 class="font-bold pb-3">Filter by Price</h3>
                <input
                  type="range"
                  class=""
                  min="0"
                  max="500"
                  v-model="shopPayload.price"
                />
                <p class="">0 $ - {{ shopPayload.price }} $</p>
              </div>
            </form>
          </div>
        </div>
        <div class="w-full px-5">
          <div v-if="status === null">
            <h1 class="text-center font-semibold">Loading...</h1>
          </div>
          <div v-else-if="error">
            <h1 class="text-red-500 font-semibold">Error</h1>
          </div>
          <div v-else>
            <div class="grid sm:grid-cols-4 gap-6 mb-20">
              <div
                v-for="book in listOfBooks"
                class="grow border rounded-lg overflow-hidden"
              >
                <RouterLink :to="`/book/${book.id}`">
                  <figure class="h-[250px]">
                    <img
                      :src="book.imageUrl"
                      alt="Laptop"
                      class="h-full w-full"
                    />
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
            <div class="flex items-center justify-center pb-16">
              <a
                href="#"
                class="mx-1 text-sm font-semibold text-gray-900"
                @click.prevent="handlePrevious"
              >
                ← Previous
              </a>
              <a
                href="#"
                class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
                v-for="page in totalPages"
                @click.prevent="(e) => handlePagination(page)"
              >
                <span :class="{ active: page === currentPage }">
                  {{ page }}</span
                >
              </a>

              <a
                href="#"
                class="mx-2 text-sm font-semibold text-gray-900"
                @click.prevent="handleNext"
              >
                Next →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: red;
}
</style>
