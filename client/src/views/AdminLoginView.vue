<template>
  <Header></Header>
  <div class="site-wrap">
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Admin Login</strong>
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
            <div class="col-md-12 text-center">
              <h2 class="h3 mb-3 text-black">Admin Login</h2>
            </div>
            <form @submit.prevent="handleAdminLogin">
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
                      v-model="adminLoginPayload.email"
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
                      v-model="adminLoginPayload.password"
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
import { useAdminStore } from "../stores/adminStore";
import useAdminService from "../services/adminService";

const router = useRouter();
const adminStore = useAdminStore();
const { adminLogin, error, adminDetail, statusCode } = useAdminService();

const adminLoginPayload = reactive({
  email: "",
  password: "",
});

const handleAdminLogin = async () => {
  await adminLogin(adminLoginPayload);

  if (statusCode.value === 200) {
    adminStore.setAdmin(adminDetail.value);
    adminStore.setAdminLoggedin(true);
    await router.push("/admin");
  }
};

onMounted(async () => {
  if (adminStore.getAdminLoggedin) {
    await router.push("/admin");
  }
});
</script>

<style scoped></style>
