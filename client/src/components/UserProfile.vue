<template>
  <div>{{ firstName }}</div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import useUserService from "../services/userService";
const name = ref("");
const userStore = useUserStore();
const { getUser, error, firstName } = useUserService();

onMounted(async () => {
  await getUser();
  // console.log(error.value);
  // if (error.value === "jwt expired") {
  //   await getUser();
  // }
});
</script>

<style scoped></style>
