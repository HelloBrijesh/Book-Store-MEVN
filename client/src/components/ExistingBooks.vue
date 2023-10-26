<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import useBookService from "../services/bookService";

const { error, status, getAllBooks, totalPages, listOfBooks } =
  useBookService();

const getBooksPayload = ref({
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
  await getAllBooks(currentPage.value, getBooksPayload.value);
};
const handleFilter = async () => {
  currentPage.value = 1;
  await getAllBooks(currentPage.value, getBooksPayload.value);
};
onMounted(async () => {
  await getAllBooks(currentPage.value, getBooksPayload.value);
});
</script>
<template>
  <div v-if="status === null">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="error">
    <h1>{{ error }}</h1>
  </div>
  <div v-else class="ms-10">
    <h1 class="text-2xl">Update Book</h1>
    <form @change="handleFilter">
      <div class="flex justify-end gap-10 my-6">
        <div class="mt-2">
          <select
            id="category"
            class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            v-model="getBooksPayload.category"
          >
            <option disabled value="">Please select one</option>
            <option>Romance</option>
            <option>Literature</option>
            <option>Science</option>
            <option>Travel</option>
            <option>History</option>
          </select>
        </div>
        <div class="">
          <input
            type="range"
            class=""
            min="0"
            max="500"
            v-model="getBooksPayload.price"
          />
          <p class="text-center">0 $ - {{ getBooksPayload.price }} $</p>
        </div>
      </div>
    </form>
    <hr />
    <div class="mt-10">
      <div class="grid sm:grid-cols-3 gap-6 mb-20">
        <div
          v-for="book in listOfBooks"
          class="grow border rounded-lg overflow-hidden"
        >
          <RouterLink :to="`/admin/updatebook/${book.id}`">
            <figure class="h-[250px]">
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
              Update
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
          <span :class="{ active: page === currentPage }"> {{ page }}</span>
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
</template>
<style scoped>
.active {
  color: red;
}
</style>
