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
const { addCartItems } = useCartService();
const { getBookById, book, listOfBooks, error, status } = useBookService();
const quantity = ref(1);

onMounted(async () => {
  await getBookById(bookId.value);
});

const handleRelatedBooks = () => {
  router.go();
};
const handleAddQuantity = () => {
  if (quantity.value < book.value.stock) quantity.value++;
};
const handleRemoveQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};
const handleAddtoCart = async (bookid) => {
  if (authStore.getisLoggedin === true) {
    await addCartItems(bookid, quantity.value);
    router.push("/cart");
  } else {
    router.push("/login");
  }
};
</script>
<template>
  <div v-if="status === 'ok'">
    <div class="w-full my-20">
      <div class="sm:container sm:mx-auto mx-5">
        <div class="flex flex-col sm:flex-row justify-center mb-28">
          <div class="sm:w-1/3 mb-10 sm:mb-0">
            <img
              alt="Nike Air Max 21A"
              class="h-full w-full rounded object-fit lg:h-96"
              :src="book.image"
            />
          </div>
          <div class="sm:w-2/4 sm:ps-10">
            <h1 class="mb-4 text-3xl font-semibold text-black">
              {{ book.title }}
            </h1>
            <p class="my-4 text-xl font-semibold text-black">
              {{ book.author }}
            </p>
            <p class="leading-relaxed">{{ book.description }}</p>
            <div class="mb-3 mt-10 flex items-center gap-4 border-gray-100">
              <p class="font-bold">Quantity</p>
              <div
                class="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12"
              >
                <button
                  class="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  @click="handleRemoveQuantity"
                >
                  -
                </button>
                <span
                  class="duration-250 text-heading flex h-full w-12 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24"
                >
                  {{ quantity }}
                </span>
                <button
                  class="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  @click="handleAddQuantity"
                >
                  +
                </button>
              </div>
            </div>
            <div class="border-b-2 pb-5">Available : {{ book.stock }}</div>
            <div class="flex items-center justify-between mt-8">
              <span class="title-font text-xl font-bold text-gray-900">
                $ {{ book.price }}
              </span>

              <button
                type="button"
                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                @click="(e) => handleAddtoCart(book.id, quantity)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div class="mb-20 sm:mb-40">
          <div class="pb-10 sm:pb-20">
            <h2 class="text-3xl font-bold text-black">Related Books</h2>
          </div>
          <div class="grid sm:grid-cols-4 gap-6">
            <div
              v-for="book in listOfBooks"
              class="grow border rounded-lg overflow-hidden"
              @click="handleRelatedBooks"
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
    </div>
  </div>
  <div v-else-if="status === 'null'">
    <h1>Loading...</h1>
  </div>
  <div v-else>
    <h1>{{ error }}</h1>
  </div>
</template>
