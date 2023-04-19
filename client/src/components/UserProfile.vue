<template>
  <div v-if="error">{{ error }}</div>
  <div>User Profile</div>
  <div>Name : {{ userDetail.firstName }} {{ userDetail.firstName }}</div>
  <div>Email : {{ userDetail.email }}</div>
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
