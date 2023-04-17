<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black" v-if="book">{{ book.bookName }}</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section" v-if="book">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img :src="book.imageUrl" alt="Image" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ book.bookName }}</h2>
            <p>
              {{ book.bookDescription }}
            </p>
            <p>
              <strong class="text-primary h4">${{ book.price }}</strong>
            </p>
            <div class="mb-1 d-flex">
              <label for="option-sm" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input type="radio" id="option-sm" name="shop-type"
                /></span>
                <span class="d-inline-block text-black">Paperback</span>
              </label>
              <label for="option-md" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input type="radio" id="option-md" name="shop-type"
                /></span>
                <span class="d-inline-block text-black">E-Book</span>
              </label>
              <label for="option-lg" class="d-flex mr-3 mb-3">
                <span
                  class="d-inline-block mr-2"
                  style="top: -2px; position: relative"
                  ><input type="radio" id="option-lg" name="shop-type"
                /></span>
                <span class="d-inline-block text-black">Audiobook</span>
              </label>
            </div>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-primary js-btn-minus"
                    type="button"
                    @click="handleSubtract"
                  >
                    &minus;
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control text-center"
                  v-model="quantity"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary js-btn-plus"
                    type="button"
                    @click="handleAdd"
                  >
                    &plus;
                  </button>
                </div>
              </div>
            </div>
            <p>
              <RouterLink
                to="/cart"
                @click="handleAddToCart"
                class="buy-now btn btn-sm btn-primary"
                >Add to Cart</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="site-section block-3 site-blocks-2 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-7 site-section-heading text-center pt-4">
            <h2>Related Books</h2>
          </div>
        </div>
        <div class="row pt-5">
          <BSBook
            v-for="book in bsbooks"
            :key="book.id"
            :imgurl="book.imgurl"
            :name="book.name"
            :author="book.author"
            :price="book.price"
          />
        </div>
      </div>
    </div> -->
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import BSBook from "../components/BSBook.vue";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useCartStore } from "../stores/cartStore";
import useBookService from "../services/bookService";

const route = useRoute();
const cartStore = useCartStore();
const { book, getBookDetails, error, statusCode } = useBookService();

const bookid = route.params.bookid;
const quantity = ref(1);
const item = ref({});

onMounted(async () => {
  await getBookDetails(bookid);
  item.value = {
    bookId: book.value._id,
    bookName: book.value.bookName,
    imageUrl: book.value.imageUrl,
    price: book.value.price,
    quantity: quantity.value,
  };
});

const handleSubtract = () => {
  if (quantity.value >= 2) {
    quantity.value--;
  }
};
const handleAdd = () => {
  if (quantity.value < book.value.quantity) {
    quantity.value++;
  }
};
const handleAddToCart = () => {
  cartStore.setCartItems(item.value);
};
</script>
<style scoped></style>
