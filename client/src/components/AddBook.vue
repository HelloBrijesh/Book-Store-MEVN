<script setup>
import { useRouter } from "vue-router";
import { storage } from "../../firebase.js";
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { onMounted, ref } from "vue";
// import useAdminService from "../services/adminService.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
library.add(faBook);

// const adminService = useAdminService();
const router = useRouter();

const addBookPayload = ref({
  title: "",
  author: "",
  description: "",
  price: 0,
  year: 0,
  pages: 0,
  stock: 0,
  sold: 0,
  category: "",
  imageUrl: "",
  imageName: "",
  language: "",
});

const handleImageUpload = async (e) => {
  addBookPayload.value.imageName = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}`;

  const storageRef = firebaseRef(
    storage,
    `BookStore/Books/${addBookPayload.value.imageName}`
  );
  const snapshot = await uploadBytes(storageRef, e.target.files[0]);
  const download_url = await getDownloadURL(storageRef);
  addBookPayload.value.imageUrl = download_url;
};

const handleAddBook = async (e) => {
  await adminService.addBook(addBookPayload.value);
  if (adminService.status.value === "ok") {
    router.go();
  }
};
onMounted(() => {});
</script>
<template>
  <div class="px-5 md:ps-20 mt-10 md:mt-0">
    <h1 class="text-2xl">Add Book</h1>
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-3/5 order-2 md:order-1">
        <form @submit.prevent="handleAddBook">
          <div class="mt-5">
            <label for="title" class="text-base font-medium text-gray-900">
              Title
            </label>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="title"
                v-model="addBookPayload.title"
              />
            </div>
          </div>
          <div class="mt-5">
            <label for="author" class="text-base font-medium text-gray-900">
              Author
            </label>
            <div class="mt-2">
              <input
                class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                id="author"
                v-model="addBookPayload.author"
              />
            </div>
          </div>
          <div class="flex justify-between">
            <div class="mt-5">
              <label for="category" class="text-base font-medium text-gray-900">
                Category
              </label>
              <div class="mt-2">
                <select
                  id="category"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  v-model="addBookPayload.category"
                >
                  <option disabled value="">Please select one</option>
                  <option>Romance</option>
                  <option>Literature</option>
                  <option>Science</option>
                  <option>Travel</option>
                  <option>History</option>
                </select>
              </div>
            </div>
            <div class="mt-5">
              <label for="language" class="text-base font-medium text-gray-900">
                Language
              </label>
              <div class="mt-2">
                <select
                  id="language"
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  v-model="addBookPayload.language"
                >
                  <option disabled value="">Please select one</option>
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="mt-5">
              <label for="year" class="text-base font-medium text-gray-900">
                Year
              </label>
              <div class="mt-2">
                <input
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  id="year"
                  v-model="addBookPayload.year"
                />
              </div>
            </div>
            <div class="mt-5">
              <label for="pages" class="text-base font-medium text-gray-900">
                Pages
              </label>
              <div class="mt-2">
                <input
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  id="pages"
                  v-model="addBookPayload.pages"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="mt-5">
              <label for="price" class="text-base font-medium text-gray-900">
                Price
              </label>
              <div class="mt-2">
                <input
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  id="price"
                  v-model="addBookPayload.price"
                />
              </div>
            </div>
            <div class="mt-5">
              <label for="stock" class="text-base font-medium text-gray-900">
                Quantity
              </label>
              <div class="mt-2">
                <input
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="number"
                  id="stock"
                  v-model="addBookPayload.stock"
                />
              </div>
            </div>
          </div>
          <div class="mt-5">
            <label
              for="description"
              class="text-base font-medium text-gray-900"
            >
              Description
            </label>
            <div class="mt-2">
              <textarea
                rows="5"
                id="description"
                class="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                v-model="addBookPayload.description"
              ></textarea>
            </div>
          </div>
          <button
            class="mt-10 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add Book
          </button>
        </form>
      </div>
      <div class="w-full md:w-2/5 mt-10 md:mx-10 order-1 md:order-2">
        <div
          class="w-full border h-[200px] mb-3 flex items-center justify-center"
        >
          <font-awesome-icon
            v-if="addBookPayload.imageUrl === ''"
            icon="fa-solid fa-book"
            class="h-2/4 w-2/4"
          />
          <img
            v-else
            :src="addBookPayload.imageUrl"
            alt="book image"
            class="h-full w-full"
          />
        </div>
        <input
          id="bookImage"
          class="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0"
          type="file"
          @change="handleImageUpload"
          accept="image/png, image/jpeg, image/jpg"
        />
        <label
          class="mt-10 cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          for="bookImage"
        >
          Upload file
        </label>
      </div>
    </div>
  </div>
</template>
