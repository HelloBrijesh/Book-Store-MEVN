<template>
  <Header></Header>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Login</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="site-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="col-md-12">
              <h2 class="h3 mb-3 text-black">Login</h2>
            </div>
            <form @submit.prevent="handleLogin">
              <div class="p-3 p-lg-5 border">
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
                      v-model="logInData.email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="password" class="text-black text-left"
                      >Password
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="password"
                      name="password"
                      v-model="logInData.password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <input
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                      value="Log In"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div class="row justify-content-center mt-5 mb-3">
              <a href="#"> Forgot Password ?</a>
            </div>
            <div class="row justify-content-center my-3">
              New to Book store ? &nbsp;
              <a href="/signup"> Click here</a> &nbsp; to Sign up
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
import { useUserStore } from "../stores/user";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const logInData = reactive({
  email: "",
  password: "",
});

function handleLogin() {
  axios
    .post("http://localhost:5000/api/login", logInData)
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
