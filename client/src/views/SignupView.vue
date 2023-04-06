<template>
  <Header></Header>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
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
                    <label for="fname" class="text-black">First Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="fname" name="fname" v-model="signUpPayload.firstName" />
                  </div>
                  <div class="col-md-6">
                    <label for="lname" class="text-black">Last Name <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="lname" name="lname" v-model="signUpPayload.lastName" />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="email" class="text-black">Email <span class="text-danger">*</span></label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder=""
                      v-model="signUpPayload.email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="password" class="text-black">Password </label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      v-model="signUpPayload.password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="confirm_password" class="text-black">Confirm Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="confirm_password"
                      name="confirm_password"
                      v-model="signUpPayload.confirm_password"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-lg-12">
                    <input type="submit" class="btn btn-primary btn-lg btn-block" value="Sign Up" />
                  </div>
                </div>
              </div>
            </form>
            <div class="row justify-content-center my-5">
              Already have an account ? &nbsp;
              <a href="/login"> Click here</a> &nbsp; to Login
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
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import useAuthService from "../services/authService";

const router = useRouter();
const userStore = useUserStore();
const { signUp, error, userDetail, statusCode } = useAuthService();

const signUpPayload = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
});

const handleSignUp = async () => {
  await signUp(signUpPayload);
  if (statusCode.value === 200) {
    userStore.setUser(userDetail.value);
    userStore.setisLoggedin(true);
    await router.push("/");
  }
};

onMounted(async () => {
  if (userStore.getisLoggedin) {
    await router.push("/");
  }
});
</script>

<style scoped></style>
