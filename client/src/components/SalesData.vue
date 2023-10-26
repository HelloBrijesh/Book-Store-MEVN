<script setup>
import { onMounted, ref } from "vue";
import useOrderService from "../services/orderService";

const { error, status, getSalesData, totalData, salesData } = useOrderService();

let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth() + 1;
let day = newDate.getDate();

const currentPage = ref(1);
const isNoData = ref(false);
let salesDataPayload = ref({
  startDate: "2023-01-01",
  endDate: `${year}-${month}-${day}`,
});

const onDateChange = async () => {
  await getSalesData(salesDataPayload.value, 1);
  if (status.value === "ok") {
    if (salesData.value.length === 0) {
      isNoData.value = true;
    } else {
      isNoData.value = false;
    }
  }
};

onMounted(async () => {
  await getSalesData(salesDataPayload.value, 1);
  if (status.value === "ok") {
    if (salesData.value.length === 0) {
      isNoData.value = true;
    }
  }
});

const handlePrevious = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await getSalesData(salesDataPayload.value, currentPage.value);
  }
};
const handleNext = async () => {
  if (currentPage.value < totalData.value) {
    currentPage.value++;
    await getSalesData(salesDataPayload.value, currentPage.value);
  }
};
const handlePagination = async (page) => {
  currentPage.value = page;
  await getSalesData(salesDataPayload.value, currentPage.value);
  if (salesData.value.length === 0) {
    isNoData.value = true;
  } else {
    isNoData.value = false;
  }
};
</script>
<template>
  <div class="px-5">
    <div class="flex justify-around">
      <div class="flex flex-col">
        <label for="startDate" class="font-bold">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          v-model="salesDataPayload.startDate"
          @change="onDateChange"
        />
      </div>
      <div class="flex flex-col">
        <label for="endDate" class="font-bold">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          v-model="salesDataPayload.endDate"
          @change="onDateChange"
        />
      </div>
    </div>
    <div class="flex justify-around my-10 font-bold">
      <div>Total Books :</div>
      <div>Total Amount :</div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Author</th>
            <th scope="col" class="px-6 py-3">Date</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Total</th>
          </tr>
        </thead>
        <tbody v-if="isNoData">
          <tr>
            <td class="text-center">No Data found</td>
          </tr>
        </tbody>
        <tbody v-for="data in salesData">
          <tr
            v-for="book in data.orderedItems"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ book.title }}
            </th>
            <td class="px-6 py-4">{{ book.author }}</td>
            <td class="px-6 py-4">{{ data.createdAt }}</td>
            <td class="px-6 py-4">{{ book.price }}</td>
            <td class="px-6 py-4">{{ book.quantity }}</td>
            <td class="px-6 py-4">{{ book.price * book.quantity }}</td>
          </tr>
        </tbody>
      </table>
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
        v-for="page in totalData"
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
