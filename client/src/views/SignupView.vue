<template>
  <Header></Header>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <RouterLink to="/">Home</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Sign Up</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="site-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div>
              <h5 v-if="error" class="text-danger text-center">{{ error }}</h5>
            </div>
            <div class="col-md-12">
              <h2 class="h3 mb-3 text-black">Register</h2>
            </div>
            <form @submit.prevent="handleSignUp">
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="firstName" class="text-black"
                      >First Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      name="firstName"
                      v-model="signUpPayload.firstName"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="text-black"
                      >Last Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      name="lastName"
                      v-model="signUpPayload.lastName"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="email" class="text-black"
                      >Email <span class="text-danger">*</span></label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder=""
                      v-model="signUpPayload.email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="password" class="text-black"
                      >Password <span class="text-danger">*</span></label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      v-model="signUpPayload.password"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="confirmPassword" class="text-black"
                      >Confirm Password
                      <span class="text-danger">*</span></label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      v-model="signUpPayload.confirmPassword"
                      required
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-lg-12">
                    <input
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                      value="Sign Up"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div class="row justify-content-center my-5">
              Already have an account ? &nbsp;
              <RouterLink to="/login"> Click here</RouterLink> &nbsp; to Login
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { onMounted, reactive } from "vue";
import { useRouter, RouterLink } from "vue-router";
import useAuthService from "../services/authService";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();
const { signUp, error, statusCode } = useAuthService();

onMounted(async () => {
  if (authStore.getisLoggedin) {
    await router.push("/");
  }
});

const signUpPayload = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  verificationReason: "signUp",
});

const handleSignUp = async () => {
  await signUp(signUpPayload);
  if (statusCode.value === "ok") {
    await router.push("/verifyemail");
  }
};
</script>

<style scoped></style>
