<script setup>
import { onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import useAuthService from "../services/authService";

const { verifyEmail, error, status } = useAuthService();
const route = useRoute();

onMounted(async () => {
  await verifyEmail(route.params.token);
});
</script>
<template>
  <section
    v-if="status === 'ok'"
    class="h-[500px] flex flex-col gap-10 items-center"
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
  <section v-if="error" class="h-[500px] flex flex-col gap-10 items-center">
    <p>{{ error }}</p>
  </section>
</template>
