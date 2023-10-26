<script setup>
import { RouterView, RouterLink } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../stores/authStore";

library.add(faUser);
const authStore = useAuthStore();
</script>
<template>
  <div class="w-full my-20">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/3">
          <div class="border flex flex-col items-center gap-5 py-10">
            <img
              v-if="authStore.getUserImage !== ''"
              :src="authStore.getUserImage"
              alt=""
              class="rounded-full h-[150px] w-[150px]"
            />
            <font-awesome-icon
              v-else
              icon="fa-solid fa-user"
              class="rounded-full h-80 w-[150px]"
            />
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
