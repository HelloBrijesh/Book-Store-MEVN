<script setup>
import { onMounted } from "vue";
import useOrderService from "../services/orderService";
import { useCartStore } from "../stores/cartStore";

const cartStore = useCartStore();

const { placeOrder, orders, error, status } = useOrderService();

onMounted(async () => {
  await placeOrder();
  console.log();
  if (status.value === "ok") {
    cartStore.$reset();
  }
});
</script>
<template>
  <div v-if="orders" class="w-full my-20">
    <div class="container mx-auto">
      <div class="flex border rounded-lg">
        <div class="w-2/4 p-7 border-r-2">
          <div v-for="item in orders.orderedItems" class="">
            <div class="flex justify-between">
              <div class="flex justify-between w-3/4">
                <div class="h-20 w-20">
                  <img
                    class="h-full w-full object-contain"
                    :src="item.image"
                    :alt="item.title"
                  />
                </div>
                <div class="ms-5 w-full">
                  <p class="font-semibold">{{ item.title }}</p>
                  <p class="">{{ item.author }}</p>
                  <p class="">x {{ item.quantity }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end justify-between w-1/4 me-5">
                <p>$ {{ item.price }}</p>
              </div>
            </div>
            <hr class="my-5" />
          </div>
          <ul class="mt-6 space-y-3 me-5">
            <li class="flex items-center justify-between text-gray-600">
              <p class="text-sm font-medium">Sub total</p>
              <p class="text-sm font-medium">$ 0</p>
            </li>
            <li class="flex items-center justify-between text-gray-900">
              <p class="text-sm font-medium">Total</p>
              <p class="text-sm font-bold">$ {{ orders.orderTotal }}</p>
            </li>
          </ul>
        </div>
        <div class="w-2/4 p-7">
          <div class="py-6">
            <h2 class="text-base font-bold text-black">Contact Information</h2>
            <p class="fontmedium mt-3 text-xs text-gray-700">
              Order Number: {{ orders.id }}
            </p>
            <p class="text-xs font-medium text-gray-700">
              Date: March 03, 2023
            </p>
            <button
              type="button"
              class="mt-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              View Invoice
            </button>
          </div>
          <hr class="my-5" />
          <div class="py-6">
            <h2 class="mb-2 text-base font-bold text-black">
              Shipping Information
            </h2>
            <p class="mt-3 text-xs font-medium text-gray-700">Lem Deluce</p>
            <p class="text-xs font-medium text-gray-700">
              1 Ronald Regan Court
            </p>
            <p class="text-xs font-medium text-gray-700">102-655-3689</p>
          </div>
          <hr class="my-5" />
          <div class="py-6">
            <h2 class="text-base font-bold text-black">Payment Information</h2>
            <p class="mt-3 text-xs font-medium text-gray-700">
              **** **** **** 6202
            </p>
            <p class="text-xs font-medium text-gray-700">Expires 09/25</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
