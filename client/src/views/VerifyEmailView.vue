<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import useAuthService from "../services/authService";
import useCartService from "../services/cartService";
import useUserService from "../services/userService";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const cartService = useCartService();
const userService = useUserService();
const { error, status, verifyEmail } = useAuthService();

onMounted(async () => {
  await verifyEmail(route.params.token);
  if (status.value === "ok") {
    // authStore.setisLoggedin(true);
    authStore.setisLoggedin(true);
    await cartService.getCart();
    if (cartService.status.value === "ok") {
      cartStore.setCartItems(cartService.cartItems.value);
      cartStore.setCartTotal(cartService.cart.value.cartTotal);
      cartStore.setTotalItems(cartService.cart.value.totalItems);
    }
    await userService.getUserDetails();
    if (userService.status.value === "ok") {
      authStore.setUserImage(userService.userDetails.value.imageUrl);
    }
    await router.push("/");
  }
});
</script>
<template>
  <section
    v-if="status === 'ok'"
    class="h-[500px] flex flex-col gap-10 items-center justify-center"
  >
    <p>Email has been verified successfully</p>
    <RouterLink to="/shop">
      <button
        type="submit"
        class="flex items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
      >
        Continue
      </button>
    </RouterLink>
  </section>
  <section
    v-if="error"
    class="h-[500px] flex flex-col gap-10 items-center justify-center"
  >
    <p>{{ error }}</p>
  </section>
</template>
