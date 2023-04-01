<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Book 1</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src="images/book_1.jpg" alt="Image" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <h2 class="text-black">Book 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores
              iusto! Molestiae expedita veritatis nesciunt doloremque sint
              asperiores fuga voluptas, distinctio, aperiam, ratione dolore.
            </p>
            <p class="mb-4">
              Ex numquam veritatis debitis minima quo error quam eos dolorum
              quidem perferendis. Quos repellat dignissimos minus, eveniet nam
              voluptatibus molestias omnis reiciendis perspiciatis illum hic
              magni iste, velit aperiam quis.
            </p>
            <p><strong class="text-primary h4">$50.00</strong></p>
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
                  >
                    &minus;
                  </button>
                </div>
                <input
                  type="text"
                  class="form-control text-center"
                  value="1"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-outline-primary js-btn-plus"
                    type="button"
                  >
                    &plus;
                  </button>
                </div>
              </div>
            </div>
            <p>
              <RouterLink to="/cart" class="buy-now btn btn-sm btn-primary"
                >Add to Cart</RouterLink
              >
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section block-3 site-blocks-2 bg-light">
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
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import BSBook from "../components/BSBook.vue";
import { RouterLink } from "vue-router";

const bsbooks = [
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
];
</script>

<style scoped></style>
