<template>
  <div>User Profile</div>
  <div>{{ user.firstName }}</div>
  <div>User Profile</div>
  <div v-if="error">{{ error }}</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import useAuthService from "../services/authService";

const { getUser, error, userDetail } = useAuthService();

const userStore = useUserStore();
const user = userStore.getUser;

onMounted(async () => {
  await getUser();
});
</script>

<style scoped></style>
