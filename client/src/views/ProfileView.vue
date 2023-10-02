<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="w-full my-20">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex">
        <div class="w-1/4">
          <div class="border flex flex-col items-center gap-5 py-10">
            <img
              src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
              alt=""
              class="rounded-full w-[150px]"
            />
            <button
              class="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Upload Image
            </button>
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
        <div class="w-3/4">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>
