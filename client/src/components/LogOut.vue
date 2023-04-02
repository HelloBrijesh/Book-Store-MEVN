<template>
  <div>Sign Out page</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();

const access_token = userStore.getAccessToken;

onMounted(() => {
  axios.defaults.withCredentials = true;

  axios
    .post(
      "http://localhost:5000/api/logout",
      {},
      {
        headers: {
          authorization: `token ${access_token}`,
        },
      }
    )
    .then(function (response) {
      userStore.$reset();
      router.push("/");
    })
    .catch(function (error) {
      console.log(error);
    });
});
</script>

<style scoped></style>
