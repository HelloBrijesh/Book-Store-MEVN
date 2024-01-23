<script setup>
import { onMounted, ref } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import useCartService from "../services/cartService";
import useOrderService from "../services/orderService";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const cartService = useCartService();
const orderService = useOrderService();

let items = ref(null);
let cartTotal = ref(null);

const handleRemoveCartItems = async (bookid, quantity, price) => {
  await cartService.removeCartItems(bookid, quantity, price);
  if (cartService.status.value === "ok") {
    cartStore.setCartItems(cartService.cartItems.value);
    cartStore.setCartTotal(cartService.cart.value.cartTotal);
    cartStore.setTotalItems(cartService.cart.value.totalItems);
    router.go();
  }
};

const placeOrderPayload = ref({
  orderTotal: cartStore.getCartTotal,
  orderedItems: cartStore.getCartItems,
  shippingAddress: {
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  },
});

const orderId = ref(null);
const handlePlaceOrder = async () => {
  placeOrderPayload.value.orderTotal = cartStore.getCartTotal;
  placeOrderPayload.value.orderedItems = cartStore.getCartItems;
  await orderService.placeOrder(placeOrderPayload.value);
  if (orderService.status.value === "ok" && orderService.checkOutUrl) {
    cartStore.$reset();
    window.location.href = orderService.checkOutUrl.value;
  }
};

onMounted(async () => {
  if (!authStore.getisLoggedin) {
    await router.push("/login");
  }
  if (cartStore.getCartItems.length === 0) {
    await router.push("/cart");
  }
  items.value = cartStore.getCartItems;
  cartTotal.value = cartStore.getCartTotal;
});
</script>

<template>
  <div class="w-full my-20">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex flex-col sm:flex-row sm:mx-20 border rounded-lg">
        <div class="sm:w-2/4 bg-gray-100 p-7">
          <div v-for="item in items" class="">
            <div class="flex justify-between">
              <div class="flex justify-between w-3/4">
                <div class="h-20 w-20">
                  <img
                    class="h-full w-full object-contain"
                    :src="item.imageUrl"
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
                <p>
                  <button
                    type="button"
                    class="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                    @click="
                      () =>
                        handleRemoveCartItems(
                          item.bookId,
                          item.quantity,
                          item.price
                        )
                    "
                  >
                    <span class="sr-only">Remove</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-5 w-5"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </p>
              </div>
            </div>
            <hr class="my-5" />
          </div>
          <div
            class="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5"
          >
            <div class="flex-grow">
              <input
                class="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter coupon code"
              />
            </div>
            <div class="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
              <button
                type="button"
                class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Apply Coupon
              </button>
            </div>
          </div>
          <ul class="mt-6 space-y-3">
            <li class="flex items-center justify-between text-gray-600">
              <p class="text-sm font-medium">Sub total</p>
              <p class="text-sm font-medium">$ 0</p>
            </li>
            <li class="flex items-center justify-between text-gray-900">
              <p class="text-sm font-medium">Total</p>
              <p class="text-sm font-bold">$ {{ cartTotal }}</p>
            </li>
          </ul>
        </div>
        <div class="sm:w-2/4 p-7">
          <form @submit.prevent="handlePlaceOrder">
            <div>
              <h1 class="font-semibold text-lg">Contact Information</h1>
              <div class="py-5">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="name"
                >
                  Full Name
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter your name"
                  id="name"
                  v-model="placeOrderPayload.shippingAddress.name"
                  required
                />
              </div>
            </div>

            <hr class="my-7" />

            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Shipping address
              </h3>
              <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                <div class="sm:col-span-3">
                  <label
                    for="address"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      v-model="placeOrderPayload.shippingAddress.streetAddress"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      v-model="placeOrderPayload.shippingAddress.city"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="region"
                    class="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      v-model="placeOrderPayload.shippingAddress.state"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="postal-code"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div class="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      v-model="placeOrderPayload.shippingAddress.postalCode"
                      required
                    />
                  </div>
                </div>
              </div>
              <hr class="my-8" />
              <div class="flex justify-end border-gray-200">
                <button
                  type="submit"
                  class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  PlaceOrder
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
