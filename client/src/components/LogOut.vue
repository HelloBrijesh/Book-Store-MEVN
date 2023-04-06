<template>
  <div>Sign Out page</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import useAuthService from "../services/authService";

const userStore = useUserStore();
const { logOut, error, statusCode } = useAuthService();

onMounted(async () => {
  await logOut();
  userStore.$reset();
  window.location.href = "/login";
});
</script>

<style scoped></style>
