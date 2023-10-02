<script setup>
import { ref } from "vue";

const accountDetails = ref({
  userName: "abc",
  firstName: "Abc",
  lastName: "Xyz",
  email: "abc@abc.com",
});
</script>
<template>
  <div class="ps-20">
    <h1 class="text-2xl font-semibold">Account Details</h1>
    <div class="flex flex-col gap-5 my-10">
      <form>
        <div>
          <label for="username" class="text-base font-medium text-gray-900">
            Username
          </label>
          <div class="mt-2">
            <input
              class="flex h-10 w-2/4 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="username"
              v-model="accountDetails.userName"
            />
          </div>
        </div>
        <div class="mt-5">
          <label for="firstName" class="text-base font-medium text-gray-900">
            Firstname
          </label>
          <div class="mt-2">
            <input
              class="flex h-10 w-2/4 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="firstName"
              v-model="accountDetails.firstName"
            />
          </div>
        </div>
        <div class="mt-5">
          <label for="lastname" class="text-base font-medium text-gray-900">
            Lastname
          </label>
          <div class="mt-2">
            <input
              class="flex h-10 w-2/4 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="lastName"
              v-model="accountDetails.lastName"
            />
          </div>
        </div>
        <div class="mt-5">
          <label for="email" class="text-base font-medium text-gray-900">
            Email
          </label>
          <div class="mt-2">
            <input
              class="flex h-10 w-2/4 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              id="email"
              v-model="accountDetails.email"
            />
          </div>
        </div>
        <button
          type="submit"
          class="mt-10 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>
