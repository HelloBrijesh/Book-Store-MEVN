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
            <div>
              <h5 v-if="error" class="text-danger text-center">{{ error }}</h5>
            </div>
            <div class="col-md-12">
              <h2 class="h3 mb-3 text-black">Login</h2>
            </div>
            <form @submit.prevent="handleLogIn">
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="email" class="text-black">Email <span class="text-danger">*</span></label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder=""
                      v-model="logInPayload.email"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="password" class="text-black text-left">Password </label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      v-model="logInPayload.password"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <input type="submit" class="btn btn-primary btn-lg btn-block" value="Log In" />
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
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import useAuthService from "../services/authService";

const router = useRouter();
const userStore = useUserStore();
const { logIn, error, userDetail, statusCode } = useAuthService();

const logInPayload = reactive({
  email: "",
  password: "",
});

const handleLogIn = async () => {
  await logIn(logInPayload);

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
