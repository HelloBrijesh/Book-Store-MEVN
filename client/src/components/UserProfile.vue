<template>
  <div>
    <p>Name : {{ userStore.getUser.firstName }}</p>
    <p>Email : {{ userStore.getUser.email }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { onMounted } from "vue";
import axios from "axios";
const userStore = useUserStore();

let access_token = userStore.getAccessToken;

onMounted(() => {
  axios.defaults.withCredentials = false;

  axios
    .post(
      "http://localhost:5000/api/user",
      {},
      {
        headers: {
          authorization: `token ${access_token}`,
        },
      }
    )
    .then(function (response) {
      const user = response.data.userDetail;
      userStore.setUser(user);
    })
    .catch(function (error) {
      console.log(error);
    });
});
</script>

<style scoped></style>
