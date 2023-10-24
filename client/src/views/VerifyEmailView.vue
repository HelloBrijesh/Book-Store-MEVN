<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import useAuthService from "../services/authService";

const authStore = useAuthStore();
const authService = useAuthService();
const route = useRoute();

onMounted(async () => {
  await authService.verifyEmail(route.params.token);
  if (authService.status.value === "ok") {
    authStore.setisLoggedin(true);
  }
});
</script>
<template>
  <section
    v-if="authService.status === 'ok'"
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
    v-if="authService.error"
    class="h-[500px] flex flex-col gap-10 items-center justify-center"
  >
    <p>{{ authService.error }}</p>
  </section>
</template>
