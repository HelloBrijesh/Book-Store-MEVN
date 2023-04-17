<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="/">Home</a> <span class="mx-2 mb-0">/</span>
            <strong class="text-black">User</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-3 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <ul class="list-unstyled mb-0">
                <li class="mb-1" @click="handleActiveTab('profile')">
                  <a href="#" class="d-flex"><span>Profile</span></a>
                </li>
                <li class="mb-1" @click="handleActiveTab('orders')">
                  <a href="#" class="d-flex"><span>Orders</span></a>
                </li>
                <li class="mb-1" @click="handleActiveTab('settings')">
                  <a href="#" class="d-flex"><span>Settings</span></a>
                </li>
                <li class="mb-1" @click="handleLogout()">
                  <a href="#" class="d-flex"><span>Log Out</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-9">
            <div v-if="activeTab === 'profile'">
              <UserProfile></UserProfile>
            </div>
            <div v-else-if="activeTab === 'orders'">
              <UserOrders></UserOrders>
            </div>
            <div v-else-if="activeTab === 'settings'">
              <Settings></Settings>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import UserProfile from "../components/UserProfile.vue";
import UserOrders from "../components/UserOrders.vue";
import Settings from "../components/Settings.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import useAuthService from "../services/authService";

const router = useRouter();
const userStore = useUserStore();
const { logout, error, statusCode } = useAuthService();

const activeTab = ref("profile");

function handleActiveTab(currentTab) {
  activeTab.value = currentTab;
}

const handleLogout = async () => {
  await logout();
  userStore.$reset();
  window.location.href = "/login";
};

onMounted(async () => {
  if (!userStore.getisLoggedin) {
    await router.push("/login");
  }
});
</script>

<style scoped></style>
