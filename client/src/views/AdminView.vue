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
          <div class="border p-4 rounded mb-4">
            <ul class="list-unstyled mb-0">
              <li class="mb-1" @click="handleActiveTab('Add Book')">
                <RouterLink to="#" class="d-flex"
                  ><span>Add Book</span></RouterLink
                >
              </li>
              <li class="mb-1" @click="handleActiveTab('Delete Book')">
                <RouterLink to="#" class="d-flex"
                  ><span>Delete Book</span></RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-9">
          <div v-if="activeTab === 'Add Book'">
            <AddBook></AddBook>
          </div>
          <div v-else-if="activeTab === 'Delete Book'">
            <DeleteBook></DeleteBook>
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
import AddBook from "../components/AddBook.vue";
import DeleteBook from "../components/DeleteBook.vue";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref("Add Book");
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

<style scoped></style>
