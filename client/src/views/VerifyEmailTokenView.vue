<template></template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import useAuthService from "../services/authService";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const { verifyEmail, authDetail, error, statusCode } = useAuthService();
const route = useRoute();
const router = useRouter();
const emailToken = ref(route.params.emailVerificationtoken);
onMounted(async () => {
  await verifyEmail(emailToken.value);
  authStore.setSessionDetails(authDetail.value);
  authStore.setisLoggedin(true);
  if (statusCode.value === "signUp" || statusCode.value === "logIn") {
    await router.push("/");
  } else if (statusCode.value === "forgotPassword") {
    await router.push("/changepassword");
  }
});
</script>
