<script setup>
import { onMounted, ref } from "vue";
import useBookService from "../services/bookService";
import useCartService from "../services/cartService";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const bookId = ref(route.params.bookid);
const { getBookById, book, listOfBooks, error, status } = useBookService();

const { addCartItems } = useCartService();

onMounted(async () => {
  await getBookById(bookId.value);
});

const handleRelatedBooks = () => {
  router.go();
};

const handleAddtoCart = async (bookid) => {
  if (authStore.getisLoggedin === true) {
    await addCartItems(bookid);
    router.push("/cart");
  }
};
</script>
<template>
  <div v-if="status === 'ok'">
    <div class="container mx-auto py-24">
      <div class="mx-auto flex flex-wrap items-start">
        <img
          alt="Nike Air Max 21A"
          class="h-64 w-full rounded object-cover lg:h-96 lg:w-1/3"
          :src="`/${book.image}`"
        />
        <div class="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
          <h1 class="mb-4 text-3xl font-semibold text-black">
            {{ book.title }}
          </h1>
          <h2 class="my-4 text-xl font-semibold text-black">
            {{ book.author }}
          </h2>
          <!-- <div class="my-4 flex items-center">
          <span class="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-500"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-500"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-500"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-500"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-500"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
            <span class="ml-3 inline-block text-xs font-semibold">
              4 Reviews
            </span>
          </span>
        </div> -->
          <p class="leading-relaxed">
            {{ book.description }}
          </p>
          <div
            class="mb-5 pb-8 mt-10 flex items-center gap-4 border-b-2 border-gray-100"
          >
            <p class="font-bold">Quantity</p>
            <div
              class="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12"
            >
              <button
                class="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                disabled=""
              >
                +
              </button>
              <span
                class="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24"
              >
                1
              </span>
              <button
                class="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
              >
                -
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="title-font text-xl font-bold text-gray-900">
              $ {{ book.price }}
            </span>

            <button
              type="button"
              class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              @click="(e) => handleAddtoCart(book.id)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto pb-32">
      <div class="pb-20">
        <h2 class="text-3xl font-bold text-black">Related Books</h2>
      </div>
      <div
        @click.prevent="handleRelatedBooks"
        class="flex justify-between gap-2"
      >
        <RouterLink
          :to="`/book/${book.id}`"
          v-for="book in listOfBooks"
          :key="book.id"
          class="rounded-md border basis-1/3"
        >
          <img
            :src="`/${book.image}`"
            alt="Book"
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
  </div>

  <div v-else-if="status === 'null'">
    <h1>Loading...</h1>
  </div>
  <div v-else>
    <h1>{{ error }}</h1>
  </div>
</template>
