<template>
  <div>Sign Out page</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import useLogOutService from "../services/logOutServices";

const router = useRouter();
const userStore = useUserStore();
const { logOut, status, error } = useLogOutService();

onMounted(async () => {
  await logOut();
  if (status.value === 1) {
    userStore.$reset();
    window.location.href = "/login";
  }
});
</script>

<style scoped></style>
