<script setup>
import { reactive } from "vue";
import useAuthService from "../services/authService";

const authService = useAuthService();

const forgotPasswordPayload = reactive({
  email: "",
});

const handleForgotPassword = async () => {
  await authService.forgotPassword(forgotPasswordPayload);
};
</script>
<template>
  <section class="w-full h-[500px] flex flex-col justify-center">
    <div v-if="authService.status === 'ok'">
      <p class="text-center">
        Verification link has been sent to
        <i>{{ forgotPasswordPayload.email }}</i
        >. Please verify your email
      </p>
    </div>
    <div v-else class="sm:container sm:mx-auto mx-5">
      <p class="text-center pb-10">Please enter your Email</p>
      <form
        @submit.prevent="handleForgotPassword"
        class="w-2/4 flex flex-col gap-6 mx-auto"
      >
        <input
          class="flex h-10 w-3/4 md:w-2/4 mx-auto rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          placeholder="Email"
          v-model="forgotPasswordPayload.email"
        />
        <button
          type="submit"
          class="w-2/4 mx-auto rounded-md bg-black px-3 py-2 font-semibold leading-7 text-white hover:bg-black/80"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>
