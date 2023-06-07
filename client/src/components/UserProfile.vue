<template>
  <div v-if="userService.error">{{ userService.error }}</div>

  <div class="border px-5 pt-4 pb-5">
    <h3 class="">User Profile</h3>
    <hr />
    <div class="pb-3">
      <span class="pr-4 font-weight-bold"> Name :</span>
      {{ userService.userDetail.firstName }}
      {{ userService.userDetail.lastName }}
    </div>
    <div class="pb-3">
      <span class="pr-4 font-weight-bold">Email :</span>
      {{ userService.userDetail.email }}
      <RouterLink to="#" @click="onChangeEmail" class="font-italic pl-3"
        >Change</RouterLink
      >
      <div v-if="changeEmail === true">
        <form class="px-5 py-3" @submit.prevent="handleUpdateEmail">
          <div class="form-group row">
            <div class="col-md-6">
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Enter New Password"
                v-model="updateEmailPayload.email"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <div class="col-lg-6">
              <input
                type="submit"
                class="btn btn-primary btn-lg btn-block"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="pb-5">
      <span class="pr-4 font-weight-bold">Password :</span>
      <RouterLink to="/changepassword" class="font-italic"
        >Change Password</RouterLink
      >
    </div>
    <div>
      <RouterLink
        to="#"
        @click="handleDeleteUser"
        class="font-italic text-danger"
        >Delete Account</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useUserService from "../services/userService";
import useAuthService from "../services/authService";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { useOrderStore } from "../stores/orderStore";

const userService = ref(useUserService());
const authService = ref(useAuthService());
const router = useRouter();

const authStore = useAuthStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const orderStore = useOrderStore();

const changeEmail = ref(false);

const onChangeEmail = () => {
  changeEmail.value = true;
};

const updateEmailPayload = ref({
  email: "",
  verificationReason: "updateEmail",
});

const handleDeleteUser = async () => {
  await userService.value.deleteUser();
  if (userService.value.statusCode === "ok") {
    authStore.$reset();
    userStore.$reset();
    orderStore.$reset();
    cartStore.$reset();
    await router.push("/");
  }
};

const handleUpdateEmail = async () => {
  await userService.value.updateEmail(updateEmailPayload.value);
  if (userService.value.statusCode === "ok") {
    await authService.value.sendVerificationEmail(updateEmailPayload.value);
    if (authService.value.statusCode === "OK") {
      await router.push("/verifyemail");
    }
  }
};

onMounted(async () => {
  await userService.value.getUser();
  userStore.setUser(userService.value.userDetail);
});
</script>

<style scoped></style>
