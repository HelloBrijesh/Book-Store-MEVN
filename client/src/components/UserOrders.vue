<script setup></script>
<template>
  <div class="ps-20">
    <h1 class="text-2xl font-semibold">Orders</h1>
    <div class="mt-10">
      <div class="w-3/4 border">
        <div class="bg-slate-100 flex justify-between px-5 py-3">
          <h2 class="">OrderNo : 123</h2>
          <h2>Date : 01/10/2023</h2>
        </div>
        <div class="">
          <ul class="m-5">
            <li class="flex">
              <div class="flex-shrink-0">
                <img
                  src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                  alt="title"
                  class="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                />
              </div>
              <div class="flex flex-col flex-1 gap-1 ms-4">
                <p>Book Title</p>
                <p>Book Author</p>
                <p class="">
                  <span>1 * </span>
                  <span>22</span>
                </p>
              </div>
              <div class="">22</div>
            </li>
          </ul>
        </div>
        <div class="bg-slate-100 flex justify-end px-5 py-3">Total : 10000</div>
      </div>
    </div>
    <div class="w-3/4 flex items-center justify-center py-16">
      <a
        href="#"
        class="mx-1 text-sm font-semibold text-gray-900"
        @click.prevent="handlePrevious"
      >
        ← Previous
      </a>
      <a
        href="#"
        class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
        v-for="page in totalPages"
        @click.prevent="(e) => handlePagination(page)"
      >
        <span :class="{ active: page === currentPage }"> {{ page }}</span>
      </a>

      <a
        href="#"
        class="mx-2 text-sm font-semibold text-gray-900"
        @click.prevent="handleNext"
      >
        Next →
      </a>
    </div>
  </div>
</template>
