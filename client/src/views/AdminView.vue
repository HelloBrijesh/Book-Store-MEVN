<script setup>
import { onMounted, ref } from "vue";
import { RouterView, RouterLink } from "vue-router";
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
const { status, error, userDetails, getUserDetails, updateProfileImage } =
  useUserService();

const user = ref({
  image: "",
});

let imageName = ref(null);

const handleProfileImage = async (e) => {
  imageName.value = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const storageRef = firebaseRef(storage, `BookStore/users/${imageName.value}`);
  uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
    getDownloadURL(storageRef)
      .then((download_url) => {
        console.log(download_url);
        user.value.image = download_url;
      })
      .then(() => {
        updateProfileImage(user.value);
      })
      .then(() => {
        getUserDetails();
      });
  });
};

onMounted(async () => {
  await getUserDetails();
});
</script>
<template>
  <div v-if="status === 'ok'" class="w-full my-20">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <div class="border flex flex-col items-center gap-5 py-10">
            <img
              v-if="userDetails.image !== ''"
              :src="userDetails.image"
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
              <RouterLink to="/admin" class="block py-2 ps-5 border-b"
                >Add Book</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/admin/existingbooks"
                class="block py-2 ps-5 border-b"
                >Existing Books</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/admin/salesdata" class="block py-2 ps-5 border-b"
                >Sales Data</RouterLink
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
<style scoped></style>
