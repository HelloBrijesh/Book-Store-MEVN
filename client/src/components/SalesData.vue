<script setup>
import { onMounted, ref } from "vue";
// import useAdminService from "../services/adminService";

// const adminService = useAdminService();

let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth() + 1;
let day = newDate.getDate();

let salesDataPayload = ref({
  startDate: "2023-01-01",
  endDate: `${year}-${month}-${day}`,
});

const onDateChange = async () => {
  await adminService.getSalesData(salesDataPayload.value, 1);
  if (adminService.status.value === "ok") {
    console.log(adminService.salesData.value);
  }
};

onMounted(async () => {
  await adminService.getSalesData(salesDataPayload.value, 1);
  if (adminService.status.value === "ok") {
    console.log(adminService.salesData.value);
  }
});

const currentPage = ref(1);

const handlePrevious = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    await adminService.getSalesData(salesDataPayload.value, 1);
  }
};
const handleNext = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    await adminService.getSalesData(salesDataPayload.value, 1);
  }
};
const handlePagination = async (page) => {
  currentPage.value = page;
  await adminService.getSalesData(salesDataPayload.value, 1);
};
</script>
<template>
  <div>
    <div class="flex justify-around">
      <div class="flex flex-col">
        <label for="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          v-model="salesDataPayload.startDate"
          @change="onDateChange"
        />
      </div>
      <div class="flex flex-col">
        <label for="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          v-model="salesDataPayload.endDate"
          @change="onDateChange"
        />
      </div>
    </div>
    <div class="flex mt-10">
      <div>Total Books :</div>
      <div>Total Amount :</div>
    </div>
    <div>
      <table>
        <tr>
          <td>Title</td>
          <td>Category</td>
          <td>Date</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Total</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
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
        v-for="page in adminService.totalData"
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
