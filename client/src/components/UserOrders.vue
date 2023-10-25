<script setup>
import { onMounted, ref } from "vue";
import useOrderService from "../services/orderService";

const orderService = useOrderService();
const { error, status, getOrders, totalOrders, orders } = useOrderService();

const currentPage = ref(1);

const handlePrevious = async () => {
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
  await getOrders(currentPage.value);
};

onMounted(async () => {
  await getOrders(currentPage.value);
});
</script>
<template>
  <div v-if="status === null">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="error">
    <h1>{{ error }}</h1>
  </div>
  <div v-else-if="totalOrders === 0">
    <h1 class="flex justify-center items-center">No Orders</h1>
  </div>
  <div v-else class="md:ps-20 mt-10 md:mt-0">
    <h1 class="text-2xl font-semibold">Orders</h1>
    <div class="mt-10">
      <div class="w-full md:w-3/4 border">
        <div class="bg-slate-100 flex justify-between px-5 py-3">
          <h2 class="">OrderNo : {{ orders[0].id }}</h2>
          <h2>Date : 01/10/2023</h2>
        </div>
        <div class="">
          <ul class="m-5">
            <li class="flex" v-for="items in orders[0].orderedItems">
              <div class="flex-shrink-0">
                <img
                  :src="items.image"
                  alt="title"
                  class="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                />
              </div>
              <div class="flex flex-col flex-1 gap-1 ms-4">
                <p>{{ items.title }}</p>
                <p>{{ items.author }}</p>
                <p class="">
                  <span>{{ items.quantity }} * </span>
                  <span>{{ items.price }}</span>
                </p>
              </div>
              <div class="">{{ items.quantity * items.price }}</div>
            </li>
          </ul>
        </div>
        <div class="bg-slate-100 flex justify-end px-5 py-3">
          Total : {{ orders[0].orderTotal }}
        </div>
      </div>
    </div>
    <div class="w-full md:w-3/4 flex items-center justify-center py-16">
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
        v-for="page in totalOrders"
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
<style scoped>
.active {
  color: red;
}
</style>
