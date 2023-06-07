<template>
  <Header></Header>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <RouterLink to="/">Home</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Forgot Password</strong>
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
              <h2 class="h3 mb-3 text-black text-center">
                Please enter your email
              </h2>
            </div>
            <form @submit.prevent="handleForgotPassword">
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="email" class="text-black"
                      >Email <span class="text-danger">*</span></label
                    >
                    <input
                      type="email"
                      class="form-control mb-4"
                      id="email"
                      name="email"
                      placeholder=""
                      v-model="forgotPasswordPayload.email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <input
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                      value="Submit"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div class="row justify-content-center mt-5 mb-3">
              <RouterLink to="/login"> Login</RouterLink>
            </div>
            <div class="row justify-content-center my-3">
              New to Book store ? &nbsp;
              <RouterLink to="/signup"> Click here</RouterLink> &nbsp; to Sign
              up
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
import { reactive } from "vue";
import { useRouter, RouterLink } from "vue-router";
import useAuthService from "../services/authService";

const router = useRouter();
const { error, authDetail, statusCode, sendVerificationEmail } =
  useAuthService();

const forgotPasswordPayload = reactive({
  email: "",
  verificationReason: "forgotPassword",
});

const handleForgotPassword = async () => {
  await sendVerificationEmail(forgotPasswordPayload);
  if (statusCode.value === "OK") {
    await router.push("/verifyemail");
  }
};
</script>

<style scoped></style>
