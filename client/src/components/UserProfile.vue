<template>
  <div>User Profile</div>
  <div>{{ userDetail.firstName }}</div>
  <div>User Profile</div>
  <div v-if="error">{{ error }}</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import useUserService from "../services/userService";

const { getUser, error, userDetail } = useUserService();

const userStore = useUserStore();

onMounted(async () => {
  await getUser();
  userStore.setUser(userDetail.value);
});
</script>

<style scoped></style>
