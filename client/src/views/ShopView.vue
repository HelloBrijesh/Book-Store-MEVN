<script setup>
import { onMounted, reactive, ref } from "vue";
import useBookService from "../services/bookService";
import { RouterLink, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { getAllBooks, error, status, listOfBooks, totalPages } =
  useBookService();

const shopPayload = ref({
  category: "Romance",
  price: "50",
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
  <section class="w-full">
    <div class="mx-auto max-w-7xl px-2 py-10 lg:px-10">
      <div class="md:flex md:flex-row md:items-start md:justify-between">
        <div>
          <h1 class="text-xl font-bold">Products</h1>
        </div>
        <div class="mt-6 flex items-center pt-2 md:mt-0 md:space-x-4 md:pt-0">
          <button
            type="button"
            class="hidden items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:inline-flex"
          >
            Sort
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
          </button>
        </div>
      </div>
      <hr class="my-8" />
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div class="hidden space-y-6 divide-y lg:col-span-2 lg:block">
          <div class="pt-6">
            <h3 class="text-lg font-semibold text-gray-900">Category</h3>
            <form @change="handleShop">
              <div class="">
                <input
                  type="radio"
                  id="romance"
                  name="category"
                  class=""
                  value="Romance"
                  v-model="shopPayload.category"
                />
                <label class="" for="romance">Romance</label>
              </div>
              <div class="">
                <input
                  type="radio"
                  id="health"
                  name="category"
                  class=""
                  value="Health"
                  v-model="shopPayload.category"
                />
                <label class="" for="health">Health</label>
              </div>
              <div class="">
                <input
                  type="radio"
                  id="science"
                  name="category"
                  class=""
                  value="Science"
                  v-model="shopPayload.category"
                />
                <label class="" for="science">Science</label>
              </div>
              <div class="">
                <input
                  type="radio"
                  id="history"
                  name="category"
                  class=""
                  value="History"
                  v-model="shopPayload.category"
                />
                <label class="" for="history">History</label>
              </div>
              <div class="">
                <input
                  type="radio"
                  id="fiction"
                  name="category"
                  class=""
                  value="Fiction"
                  v-model="shopPayload.category"
                />
                <label class="" for="fiction">Fiction</label>
              </div>

              <div class="">
                <h3 class="">Filter by Price</h3>
                <input type="range" class="" min="0" max="500" />
                <p class="">0 $ - {{}} $</p>
              </div>
            </form>
          </div>
        </div>
        <div class="w-full border-l-2 px-2 lg:col-span-10">
          <div
            class="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4"
          >
            <div v-for="book in listOfBooks" class="rounded-md border">
              <RouterLink :to="`/book/${book.id}`">
                <img
                  :src="book.image"
                  alt="Laptop"
                  class="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                />
                <div class="p-4">
                  <h1 class="inline-flex items-center text-lg font-semibold">
                    {{ book.title }}
                  </h1>
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
          <div class="flex items-center justify-center">
            <a
              href="#"
              class="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900"
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
    </div>
  </section>
</template>
<style scoped>
.active {
  color: red;
}
</style>
