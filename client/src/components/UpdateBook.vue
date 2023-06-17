<template>
  <div class="row d-flex justify-content-center">
    <div class="col-md-6">
      <form @change="handleShop">
        <div class="form-group row">
          <div class="col-md-12">
            <label for="bookCategory">Please Select Category</label>
            <select
              id="bookCategory"
              class="form-control"
              v-model="updatePayload.category"
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
      </form>
    </div>
  </div>
  <div class="row">
    <div
      v-for="book in shopService.books"
      class="col-sm-6 col-lg-4 mb-4"
      data-aos="fade-up"
    >
      <div class="card shadow-sm">
        <figure class="block-4-image" style="height: 250px">
          <img
            :src="book.imageUrl"
            class="card-img-top h-100"
            alt="BookImage"
          />
        </figure>

        <div class="card-body pt-0">
          <h5
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            "
          >
            {{ book.bookName }}
          </h5>
          <p class="mb-0">{{ book.authorName }}</p>
          <p class="text-primary font-weight-bold mb-0">$ {{ book.price }}</p>
          <div class="d-flex justify-content-between">
            <RouterLink to="#">Update</RouterLink>
            <RouterLink to="#" @click.prevent="() => handleDeleteBook(book._id)"
              >Delete</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" data-aos="fade-up">
    <div class="col-md-12 text-center">
      <div class="site-block-27">
        <ul>
          <li @click.prevent="handlePrev">
            <RouterLink to="#">&lt;</RouterLink>
          </li>
          <li
            v-for="page in shopService.totalPages"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import useShopService from "../services/shopService";
import useBookService from "../services/bookService";

const route = useRoute();
const router = useRouter();

const shopService = ref(useShopService());
const bookService = ref(useBookService());
// const { getBooks, error, statusCode, books, totalPages } = useShopService();

const updatePayload = ref({
  category: "Romance",
  price: "50000",
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
  await shopService.value.getBooks(updatePayload.value, currentPage.value);
};

const handleShop = async () => {
  await shopService.value.getBooks(updatePayload.value, 1);
  currentPage.value = 1;
};

const handleDeleteBook = async (bookId) => {
  console.log(bookId);
  await bookService.value.deleteBook(bookId);
  if (bookService.value.statusCode === "ok") {
    router.go("/admin#");
  }
};

onMounted(async () => {
  await shopService.value.getBooks(updatePayload.value, 1);
});
</script>

<style scoped></style>
