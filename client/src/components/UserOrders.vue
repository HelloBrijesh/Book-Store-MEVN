<script setup>
import { onMounted, ref } from "vue";
import useOrderService from "../services/orderService";

const { error, status, getOrders, totalOrders, orders } = useOrderService();

const currentPage = ref(1);
const orderDate = ref("");
const getFormatedDate = (date) => {
  const originalDate = new Date(date);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  const formattedTime = originalDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  return `${formattedDate} ${formattedTime}`;
};

const handlePrevious = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    handlePagination(currentPage.value);
  }
};
const handleNext = async () => {
  if (currentPage.value < totalOrders.value) {
    currentPage.value++;
    handlePagination(currentPage.value);
  }
};
const handlePagination = async (page) => {
  currentPage.value = page;
  await getOrders(currentPage.value);
  if (orders !== null) {
    orderDate.value = getFormatedDate(orders.value[0].createdAt);
  }
};

onMounted(async () => {
  await getOrders(currentPage.value);
  if (orders !== null) {
    orderDate.value = getFormatedDate(orders.value[0].createdAt);
  }
});
</script>
<template>
  <h1 class="md:ps-20 mt-10 md:mt-0 text-2xl font-semibold">Orders</h1>
  <div v-if="status === null" class="h-96 flex justify-center items-center">
    <h1 class="font-semibold">Loading...</h1>
  </div>
  <div v-else-if="error" class="h-96 flex justify-center items-center">
    <h1 class="font-semibold text-red-500">{{ error }}</h1>
  </div>
  <div v-else-if="totalOrders === 0">
    <h1 class="flex justify-center items-center">No Orders</h1>
  </div>
  <div v-else class="md:ps-20 mt-10 md:mt-0">
    <div class="mt-10">
      <div class="w-full md:w-3/4 border">
        <div class="bg-slate-100 flex justify-between px-5 py-3">
          <h2 class="">OrderNo : {{ orders[0].id }}</h2>
          <h2>Date : {{ orderDate }}</h2>
        </div>
        <div class="">
          <ul class="m-5">
            <li class="flex mb-5" v-for="items in orders[0].orderedItems">
              <div class="flex-shrink-0">
                <img
                  :src="items.imageUrl"
                  alt="title"
                  class="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                />
              </div>
              <div class="flex flex-col flex-1 gap-1 ms-4">
                <p>{{ items.title }}</p>
                <p>{{ items.author }}</p>
                <p class="">
                  <span>{{ items.quantity }} x </span>
                  <span>{{ items.price }}</span>
                </p>
              </div>
              <div class="">{{ items.quantity * items.price }}</div>
            </li>
          </ul>
          <div class="px-5 py-3">
            <div class="font-bold mb-3">Shipping Address</div>
            <p>{{ orders[0].shippingAddress.name }}</p>
            <p>
              {{ orders[0].shippingAddress.streetAddress }}&nbsp;{{
                orders[0].shippingAddress.city
              }}
            </p>
            <p>
              {{ orders[0].shippingAddress.state }}&nbsp;{{
                orders[0].shippingAddress.postalCode
              }}
            </p>
          </div>
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
