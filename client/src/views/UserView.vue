<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">User</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-3 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <ul class="list-unstyled mb-0">
                <li class="mb-1">
                  <a href="#" class="d-flex"><span>Profile</span></a>
                </li>
                <li class="mb-1">
                  <a href="#" class="d-flex"><span>Orders</span></a>
                </li>
                <li class="mb-1">
                  <a href="#" class="d-flex"><span>Settings</span></a>
                </li>
              </ul>
            </div>
            <div class="col-md-9"></div>
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

<style lang="scss" scoped></style>
