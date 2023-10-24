<script setup>
import { ref } from "vue";
import useAuthService from "../services/authService";

const authService = useAuthService();

const changePasswordPayload = ref({
  currentPassword: "",
  newPassword: "",
});

const handleChangePassword = async () => {
  await authService.changePassword(changePasswordPayload.value);
  if (authService.status.value == "ok") {
    changePasswordPayload.value = {
      currentPassword: "",
      newPassword: "",
    };
  }
};
</script>
<template>
  <div class="md:ps-20 mt-10 md:mt-0">
    <h1 class="text-2xl font-semibold">Change Password</h1>
    <div class="mt-10">
      <form @submit.prevent="handleChangePassword">
        <div v-if="authService.status === 'ok'">Password changed Successfully</div>
        <div v-else>{{ authService.error }}</div>
        <table class="border-separate border-spacing-y-5">
          <tr>
            <td>
              <label
                for="currentPassword"
                class="text-base font-medium text-gray-900"
              >
                Current Password
              </label>
            </td>
            <td>
              <input
                class="ms-5 h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                id="currentPassword"
                v-model="changePasswordPayload.currentPassword"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label
                for="newPassword"
                class="text-base font-medium text-gray-900"
              >
                New Password
              </label>
            </td>
            <td>
              <input
                class="ms-5 h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                id="newPassword"
                v-model="changePasswordPayload.newPassword"
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button
                class="ms-5 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Submit
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
