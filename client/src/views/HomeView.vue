<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="site-blocks-cover banner" data-aos="fade">
      <div class="container">
        <div
          class="row align-items-start align-items-md-center justify-content-end"
        >
          <div class="col-12 text-center pt-5">
            <h1 class="mb-2 text-white">Find Your Next Book</h1>
            <div class="intro-text text-center">
              <!-- <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. </p> -->
              <p>
                <RouterLink to="/shop" class="btn btn-sm btn-primary mt-4"
                  >Shop Now</RouterLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section site-section-sm site-blocks-1">
      <div class="container">
        <div class="row">
          <div
            class="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
            data-aos="fade-up"
            data-aos-delay=""
          >
            <div class="icon mr-4 align-self-start">
              <span class="icon-truck"></span>
            </div>
            <div class="text">
              <h2 class="text-uppercase">Free Shipping</h2>
              <p>
                Shop with us and enjoy free shipping on all orders, no matter
                the size or destination.
              </p>
            </div>
          </div>
          <div
            class="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="icon mr-4 align-self-start">
              <span class="icon-refresh2"></span>
            </div>
            <div class="text">
              <h2 class="text-uppercase">Free Returns</h2>
              <p>
                We offer free returns for your convenience. If you're not
                completely satisfied with your purchase.
              </p>
            </div>
          </div>
          <div
            class="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="icon mr-4 align-self-start">
              <span class="icon-help"></span>
            </div>
            <div class="text">
              <h2 class="text-uppercase">Customer Support</h2>
              <p>
                We're committed to providing you with excellent service and
                ensuring your shopping experience is smooth and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section site-blocks-2">
      <div class="container">
        <div class="row">
          <div
            class="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
            data-aos="fade"
            data-aos-delay=""
          >
            <RouterLink to="/shop" class="block-2-item">
              <figure class="image">
                <img src="/images/paperback.jpg" alt="" class="img-fluid" />
              </figure>
              <div class="text">
                <!-- <span class="text-uppercase">Collections</span> -->
                <h3>Paperback</h3>
              </div>
            </RouterLink>
          </div>
          <div
            class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
            data-aos="fade"
            data-aos-delay="100"
          >
            <RouterLink to="/shop" class="block-2-item">
              <figure class="image">
                <img src="/images/hardcover.jpg" alt="" class="img-fluid" />
              </figure>
              <div class="text">
                <!-- <span class="text-uppercase">Collections</span> -->
                <h3>E-Books</h3>
              </div>
            </RouterLink>
          </div>
          <div
            class="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
            data-aos="fade"
            data-aos-delay="200"
          >
            <RouterLink to="/shop" class="block-2-item">
              <figure class="image">
                <img src="/images/audiobook.jpg" alt="" class="img-fluid" />
              </figure>
              <div class="text">
                <!-- <span class="text-uppercase"></span> -->
                <h3>Audiobook</h3>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section block-3 site-blocks-2 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 site-section-heading text-center pt-4">
            <h2>Bestselling Books</h2>
          </div>
        </div>
        <div class="row pt-5">
          <BSBook
            v-for="book in listOfBooks"
            :key="book._id"
            :bookId="book._id"
            :imgurl="book.imageUrl"
            :name="book.bookName"
            :author="book.authorName"
            :price="book.price"
          />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import BSBook from "../components/BSBook.vue";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import useBookService from "../services/bookService";

const { bestSellingBooks, statusCode, error, listOfBooks } = useBookService();

onMounted(async () => {
  await bestSellingBooks();
});
</script>

<style scoped>
.banner {
  background-image: url(/images/hero_1.png);
}
</style>
