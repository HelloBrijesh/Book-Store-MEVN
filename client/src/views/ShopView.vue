<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <RouterLink to="/">Home</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Shop</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-3 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <form @change="handleShop">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">
                  Categories
                </h3>

                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="romance"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Romance"
                  />
                  <label class="custom-control-label text-black" for="romance"
                    >Romance</label
                  >
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="health"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Literature"
                  />
                  <label class="custom-control-label text-black" for="health"
                    >Literature</label
                  >
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="food"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Science"
                  />
                  <label class="custom-control-label text-black" for="food"
                    >Science</label
                  >
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="travel"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Travel"
                  />
                  <label class="custom-control-label text-black" for="travel"
                    >Travel</label
                  >
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="history"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="History"
                  />
                  <label class="custom-control-label text-black" for="history"
                    >History</label
                  >
                </div>

                <div class="my-4 text-black">
                  <h3 class="mb-3 h6 text-uppercase d-block">
                    Filter by Price
                  </h3>
                  <input
                    type="range"
                    class="custom-range"
                    min="0"
                    max="500"
                    v-model="shopPayload.price"
                  />
                  <p class="mt-3">0 $ - {{ shopPayload.price }} $</p>
                </div>
              </form>
              <div class="mb-4">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">Type</h3>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="paperback"
                    name="type"
                    class="custom-control-input"
                    value="Paperback"
                  />
                  <label class="custom-control-label text-black" for="paperback"
                    >Paperback</label
                  >
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="ebook"
                    name="type"
                    class="custom-control-input"
                    value="Ebook"
                  />
                  <label class="custom-control-label text-black" for="ebook"
                    >E-book</label
                  >
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="audiobook"
                    name="type"
                    class="custom-control-input"
                    value="Audiobook"
                  />
                  <label class="custom-control-label text-black" for="audiobook"
                    >Audiobook</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="row mb-5">
              <Book
                v-for="book in books"
                :key="book._id"
                :bookId="book._id"
                :imgurl="book.imageUrl"
                :name="book.bookName"
                :author="book.authorName"
                :price="book.price"
              />
            </div>
            <div class="row" data-aos="fade-up">
              <div class="col-md-12 text-center">
                <div class="site-block-27">
                  <ul>
                    <li @click.prevent="handlePrev">
                      <RouterLink to="#">&lt;</RouterLink>
                    </li>
                    <li
                      v-for="page in totalPages"
                      @click="(e) => handlePagination(page)"
                      :class="{ active: page === currentPage }"
                    >
                      <RouterLink to="#">{{ page }}</RouterLink>
                    </li>
                    <li @click.prevent="handleNext">
                      <RouterLink to="#" disabled>&gt;</RouterLink>
                    </li>

                    <!-- <li class="active"><span>1</span></li>
                    <li><a href="#">5</a></li> -->
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Book from "../components/Book.vue";
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import useShopService from "../services/shopService";

const route = useRoute();
const router = useRouter();
const { getBooks, error, statusCode, books, totalPages } = useShopService();

const shopPayload = ref({
  category: "Romance",
  price: "50",
});
const currentPage = ref(1);

const handlePrev = async () => {
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
  await getBooks(shopPayload.value, currentPage.value);
};

const handleShop = async () => {
  await getBooks(shopPayload.value, 1);
  currentPage.value = 1;
};
onMounted(async () => {
  await getBooks(shopPayload.value, 1);
});
</script>

<style scoped></style>
