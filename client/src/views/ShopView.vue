<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Shop</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-9 order-2">
            <div class="row mb-5">
              <Book
                v-for="book in books"
                :key="book._id"
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
                    <li><a href="#">&lt;</a></li>
                    <li v-for="page in totalPages">
                      <a href="#">{{ page }}</a>
                    </li>
                    <li><a href="#">&gt;</a></li>

                    <!-- <li class="active"><span>1</span></li>
                    <li><a href="#">5</a></li> -->
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 order-1 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <form @change="handleShop">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">Categories</h3>

                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="romance"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Romance"
                  />
                  <label class="custom-control-label text-black" for="romance">Romance</label>
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="health"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Health"
                  />
                  <label class="custom-control-label text-black" for="health">Health</label>
                </div>
                <div class="custom-control custom-radio">
                  <input
                    type="radio"
                    id="food"
                    name="category"
                    class="custom-control-input"
                    v-model="shopPayload.category"
                    value="Food"
                  />
                  <label class="custom-control-label text-black" for="food">Food</label>
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
                  <label class="custom-control-label text-black" for="travel">Travel</label>
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
                  <label class="custom-control-label text-black" for="history">History</label>
                </div>

                <div class="my-4 text-black">
                  <h3 class="mb-3 h6 text-uppercase d-block">Filter by Price</h3>
                  <input type="range" class="custom-range" min="0" max="500" v-model="shopPayload.price" />
                  <p class="mt-3">0 $ - {{ shopPayload.price }} $</p>

                  <!-- <input type="range" class="custom-range" :min="0" :max="500" id="price" v-model:price="count" /> -->
                  <!-- <div id="slider-range" class="border-primary"></div>
                <input
                  type="text"
                  name="text"
                  id="amount"
                  class="form-control border-0 pl-0 bg-white"
                  disabled=""
                  v-model="price"
                /> -->
                </div>
              </form>
              <div class="mb-4">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">Type</h3>
                <label for="s_sm" class="d-flex">
                  <input type="checkbox" id="s_sm" class="mr-2 mt-1" />
                  <span class="text-black">Paperback</span>
                </label>
                <label for="s_md" class="d-flex">
                  <input type="checkbox" id="s_md" class="mr-2 mt-1" />
                  <span class="text-black">E-Book</span>
                </label>
                <label for="s_lg" class="d-flex">
                  <input type="checkbox" id="s_lg" class="mr-2 mt-1" />
                  <span class="text-black">Audiobook</span>
                </label>
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
import useShopService from "../services/shopService";
import { ref, onMounted } from "vue";

// const { getBooks, error, statusCode, books, totalPages } = useShopService();

const shopPayload = ref({
  category: "Romance",
  price: "50",
});
const handleShop = async () => {
  // await getBooks(shopPayload.value);
};
onMounted(async () => {
  // await getBooks(shopPayload.value);
});
const books = [
  {
    id: 1,
    imgurl: "images/book_1.jpg",
    name: "Book 1",
    author: "Author 1",
    price: "$100",
  },
  {
    id: 2,
    imgurl: "images/book_2.jpg",
    name: "Book 2",
    author: "Author 2",
    price: "$200",
  },
  {
    id: 3,
    imgurl: "images/book_3.jpg",
    name: "Book 3",
    author: "Author 3",
    price: "$300",
  },
  {
    id: 4,
    imgurl: "images/book_4.jpg",
    name: "Book 4",
    author: "Author 4",
    price: "$400",
  },
  {
    id: 5,
    imgurl: "images/book_5.jpg",
    name: "Book 5",
    author: "Author 5",
    price: "$500",
  },
  {
    id: 6,
    imgurl: "images/book_6.jpg",
    name: "Book 6",
    author: "Author 6",
    price: "$600",
  },
  {
    id: 7,
    imgurl: "images/book_7.jpg",
    name: "Book 7",
    author: "Author 7",
    price: "$700",
  },
  {
    id: 8,
    imgurl: "images/book_8.jpg",
    name: "Book 8",
    author: "Author 8",
    price: "$800",
  },
  {
    id: 9,
    imgurl: "images/book_8.jpg",
    name: "Book 9",
    author: "Author 9",
    price: "$1900",
  },
];
</script>

<style scoped></style>
