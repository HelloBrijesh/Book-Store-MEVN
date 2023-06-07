<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <RouterLink to="/">Home</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">User</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-3 mb-5 mb-md-0">
            <div class="border rounded mb-0">
              <ul class="list-unstyled mb-0 pb-0 profile-menu">
                <li class="mb-1" @click="handleActiveTab('profile')">
                  <RouterLink to="#" class="d-block py-3 px-4"
                    ><span>Profile</span></RouterLink
                  >
                </li>
                <li @click="handleActiveTab('orders')">
                  <RouterLink to="#" class="d-block py-3 px-4"
                    ><span>Orders</span></RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-9 text-black">
            <div v-if="activeTab === 'profile'">
              <UserProfile></UserProfile>
            </div>
            <div v-else-if="activeTab === 'orders'">
              <UserOrders></UserOrders>
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
import { onMounted, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref("profile");

function handleActiveTab(currentTab) {
  activeTab.value = currentTab;
}

onMounted(async () => {
  if (!authStore.getisLoggedin) {
    // router.push("/login");
  }
});
</script>

<style scoped>
.profile-menu {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
}
.profile-menu li a {
  color: black;
}
.profile-menu li:hover {
  background-color: #f8f9fa;
  color: #7971ea;
}
.profile-menu li:hover a {
  color: #7971ea;
}
</style>
