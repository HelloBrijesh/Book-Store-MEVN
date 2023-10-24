<script setup>
import { onMounted, ref } from "vue";
import useBookService from "../services/bookService";
import { useRoute, useRouter } from "vue-router";

const bookService = useBookService();
const route = useRoute();
const router = useRouter();
const bookId = ref(route.params.bookid);

const updateBookPayload = ref({
  price: 0,
  stock: 0,
});

const handleUpdateBook = async () => {
  await bookService.updateBook(updateBookPayload.value, bookId.value);
  if (bookService.status.value === "ok") {
    updateBookPayload.value = {
      price: bookService.book.value.price,
      stock: bookService.book.value.stock,
    };
  }
};

const handleDeleteBook = async () => {
  await bookService.deleteBook(bookId.value);
  if (bookService.status.value === "ok") {
    await router.push("/admin/existingbooks");
  }
};

onMounted(async () => {
  await bookService.getBookById(bookId.value);
  if (bookService.status.value === "ok") {
    updateBookPayload.value = {
      price: bookService.book.value.price,
      stock: bookService.book.value.stock,
    };
  }
});
</script>

<template>
  <div v-if="bookService.status === 'null'">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="bookService.error">
    <h1>{{ bookService.error }}</h1>
  </div>
  <div class="ms-10" v-else>
    <h1 class="text-2xl">Update Book</h1>
    <div class="">
      <div class="mt-5">
        <img :src="bookService.book.image" alt="book image" />
      </div>
      <div class="mt-10 flex flex-col gap-3">
        <p>Title : {{ bookService.book.title }}</p>
        <p>Author : {{bookService.book.author }}</p>
        <p>Category : {{ bookService.book.category }}</p>
        <p>Language: {{ bookService.book.language }}</p>
        <p>Year: {{ bookService.book.year }}</p>
      </div>

      <div class="mt-5 flex gap-5">
        <div class="">
          <label for="price" class="text-base font-medium text-gray-900">
            Price
          </label>
          <div class="mt-2">
            <input
              class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              id="price"
              v-model="updateBookPayload.price"
            />
          </div>
        </div>
        <div class="">
          <label for="stock" class="text-base font-medium text-gray-900">
            Stock
          </label>
          <div class="mt-2">
            <input
              class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="number"
              id="stock"
              v-model="updateBookPayload.stock"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="mt-5 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        @click="handleUpdateBook"
      >
        Update
      </button>
      <button
        type="submit"
        class="mt-5 ms-5 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        @click="handleDeleteBook"
      >
        Delete Book
      </button>
    </div>
  </div>
</template>
