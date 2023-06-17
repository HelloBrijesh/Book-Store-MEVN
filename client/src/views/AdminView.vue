<template>
  <Header></Header>
  <div class="bg-light py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-12 mb-0">
          <RouterLink to="/">Home</RouterLink> <span class="mx-2 mb-0">/</span>
          <strong class="text-black">Admin</strong>
        </div>
      </div>
    </div>
  </div>
  <div class="site-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <h2 class="h3 mb-5 text-black">{{ activeTab }}</h2>
        </div>
        <div class="col-md-3 mb-5 mb-md-0">
          <div class="border rounded mb-4">
            <ul class="list-unstyled mb-0 admin-menu">
              <li class="" @click="handleActiveTab('Add New Book')">
                <RouterLink to="#" class="d-block py-3 px-4"
                  ><span>Add New Book</span></RouterLink
                >
              </li>
              <li class="" @click="handleActiveTab('Update Book')">
                <RouterLink to="#" class="d-block py-3 px-4"
                  ><span>Update Book</span></RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div v-if="activeTab === 'Add New Book'">
            <AddNewBook></AddNewBook>
          </div>
          <div v-else-if="activeTab === 'Update Book'">
            <UpdateBook></UpdateBook>
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
import AddNewBook from "../components/AddNewBook.vue";
import UpdateBook from "../components/UpdateBook.vue";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref("Add New Book");
const handleActiveTab = (currentTab) => {
  activeTab.value = currentTab;
};

onMounted(async () => {
  const session = authStore.getSessionDetails;
  if (session.role != "admin") {
    router.push("/");
  }
});
</script>

<style scoped>
.admin-menu {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
}
.admin-menu li a {
  color: black;
}
.admin-menu li:hover {
  background-color: #f8f9fa;
  color: #7971ea;
}
.admin-menu li:hover a {
  color: #7971ea;
}
</style>
