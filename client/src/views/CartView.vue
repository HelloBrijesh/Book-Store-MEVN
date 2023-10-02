<script setup>
import { onMounted, ref } from "vue";
import useCartService from "../services/cartService";
import { useCartStore } from "../stores/cartStore";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const { getCart, removeCartItems, cart, cartItems, error, status } =
  useCartService();
const authStore = useAuthStore();
const cartStore = useCartStore();

const handleRemoveCartItems = async (bookid, quantity, price) => {
  await removeCartItems(bookid, quantity, price);
  if (status.value === "ok") {
    router.go();
  }
};

onMounted(async () => {
  if (!authStore.getisLoggedin) {
    await router.push("/login");
  }
  await getCart();
  cartStore.setCartItems(cartItems.value);
  cartStore.setCartTotal(cart.value.cartTotal);
  cartStore.setTotalItems(cart.value.totalItems);
});
</script>
<template>
  <div v-if="cart" class="w-full py-16">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex flex-col sm:flex-row gap-20">
        <div class="sm:w-2/4">
          <h1
            class="mb-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Shopping Cart
          </h1>
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
          <ul role="list" class="divide-y divide-gray-200 border">
            <div v-for="item in cartStore.getCartItems" class="">
              <li class="flex py-6 sm:py-6">
                <div class="flex-shrink-0">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                  />
                </div>
                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div
                    class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                  >
                    <div>
                      <div class="flex justify-between">
                        <h3 class="text-sm">
                          <a href="#" class="font-semibold text-black">
                            {{ item.title }}
                          </a>
                        </h3>
                      </div>
                      <div class="mt-1 flex text-sm">
                        <p class="text-sm text-gray-500">{{ item.author }}</p>
                      </div>
                      <div class="mt-3 flex items-end">
                        <p class="text-sm font-medium text-gray-900">
                          <span class="me-5"> {{ item.quantity }} </span> X
                          <span class="ms-5"> {{ item.price }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="me-5">
                  <button
                    type="button"
                    class="flex items-center space-x-1 px-2 py-1 pl-0"
                    @click="
                      () =>
                        handleRemoveCartItems(
                          item.bookId,
                          item.quantity,
                          item.price
                        )
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-red-500"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    <span class="text-xs font-medium text-red-500">Remove</span>
                  </button>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div class="sm:w-1/4">
          <h2
            id="summary-heading"
            class="text-center sm:mt-5 pb-8 border-b border-gray-200 text-lg font-medium text-gray-900"
          >
            Price Details
          </h2>
          <div>
            <dl class="space-y-1 px-2 py-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm text-gray-800">
                  Price - {{ cartStore.getTotalItems }} Items
                </dt>
                <dd class="text-sm font-medium text-gray-900">
                  $ {{ cartStore.getCartTotal }}
                </dd>
              </div>
              <div class="flex items-center justify-between pt-4">
                <dt class="flex items-center text-sm text-gray-800">
                  <span>Discount</span>
                </dt>
                <dd class="text-sm font-medium text-green-700">0</dd>
              </div>
              <div class="flex items-center justify-between py-4">
                <dt class="flex text-sm text-gray-800">
                  <span>Delivery Charges</span>
                </dt>
                <dd class="text-sm font-medium text-green-700">Free</dd>
              </div>
              <div
                class="flex items-center justify-between border-y border-dashed py-4"
              >
                <dt class="text-base font-medium text-gray-900">
                  Total Amount
                </dt>
                <dd class="text-base font-medium text-gray-900">
                  ₹ {{ cartStore.getCartTotal }}
                </dd>
              </div>
              <div class="pt-10 text-center">
                <RouterLink
                  to="/checkout"
                  class="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Checkout
                </RouterLink>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
