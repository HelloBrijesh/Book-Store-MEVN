<template>
  <Header></Header>
  <div class="bg-light py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-0">
          <RouterLink to="/">Home</RouterLink>
          <span class="mx-2 mb-0">/</span>
          <strong class="text-black">Sign Up</strong>
        </div>
      </div>
    </div>
  </div>
  <div class="py-5">
    <div class="container py-5">
      <p class="text-center py-5 my-5">
        Email Verification link has been sent to your e-mail
      </p>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
