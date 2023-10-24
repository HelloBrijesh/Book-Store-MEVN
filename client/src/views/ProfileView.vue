<script setup>
import { onMounted, ref } from "vue";

import { RouterLink, RouterView } from "vue-router";
import useUserService from "../services/userService";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../firebase.js";
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

library.add(faUser);

const userService = useUserService();

const accountDetails = ref({
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
});

let imageName = ref(null);

const handleProfileImage = async (e) => {
  imageName.value = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const storageRef = firebaseRef(storage, `BookStore/users/${imageName.value}`);
  uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
    getDownloadURL(storageRef)
      .then((download_url) => {
        accountDetails.value.image = download_url;
      })
      .then(() => {
        userService.updateUserDetails(accountDetails.value);
      })
      .then(() => {
        userService.getUserDetails();
      });
  });
};

onMounted(async () => {
  await userService.getUserDetails();
  if (userService.status.value === "ok") {
    accountDetails.value = {
      userName: userService.userDetails.value.userName,
      firstName: userService.userDetails.value.firstName,
      lastName: userService.userDetails.value.lastName,
      email: userService.userDetails.value.email,
      image: userService.userDetails.value.image,
    };
  }
});
</script>
<template>
  <div v-if="userService.status === 'null'">
    <h1>Loading...</h1>
  </div>
  <div v-else-if="userService.error">
    <h1>{{ userService.error }}</h1>
  </div>
  <div v-else-if="userService.status === 'ok'" class="w-full my-20">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/4">
          <div class="border flex flex-col items-center gap-5 py-10">
            <img
              v-if="userService.userDetails.image !== ''"
              :src="userService.userDetails.image"
              alt=""
              class="rounded-full w-[150px]"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-user"
              class="rounded-full h-80 w-[150px]"
            />
            <input
              id="file-input"
              class="absolute w-[1px] h-[1px] p-0 m-[-1px] overflow-hidden whitespace-nowrap border-0"
              type="file"
              @change="handleProfileImage"
              accept="image/png, image/jpeg, image/jpg"
            />
            <label
              class="mt-10 cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              for="file-input"
            >
              Upload file
            </label>
          </div>
          <ul class="border border-t-0 border-b-0">
            <li>
              <RouterLink to="/profile" class="block py-2 ps-5 border-b"
                >Account Details</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/profile/changepassword"
                class="block py-2 ps-5 border-b"
                >Change Password</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/profile/userorders"
                class="block py-2 ps-5 border-b"
                >Orders</RouterLink
              >
            </li>
          </ul>
        </div>
        <div class="w-full md:w-3/4">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>
