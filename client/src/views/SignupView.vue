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
            <div class="col-md-12">
              <h2 class="h3 mb-3 text-black">Register</h2>
            </div>
            <form @submit.prevent="handleSignUp">
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="fname" class="text-black"
                      >First Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="fname"
                      name="fname"
                      v-model="signUpData.firstName"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="lname" class="text-black"
                      >Last Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="lname"
                      name="lname"
                      v-model="signUpData.lastName"
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
                      v-model="signUpData.email"
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
                      v-model="signUpData.password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="confirm_password" class="text-black"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      id="confirm_password"
                      name="confirm_password"
                      v-model="signUpData.confirm_password"
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
import { reactive, ref } from "vue";
import axios from "axios";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const signUpData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
});

function handleSignUp() {
  axios
    .post("http://localhost:5000/api/signup", signUpData)
    .then(function (response) {
      const token = response.data.access_token;
      const userId = response.data.userId;
      userStore.setisLoggedin(true);
      userStore.setUserId(userId);
      userStore.setAccessToken(token);
      router.push("/");
    })
    .catch(function (error) {
      console.log("inside error");
      console.log(error);
    });
}
</script>

<style scoped></style>
