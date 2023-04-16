import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useAdminStore = defineStore("adminStore", () => {
  const adminLoggedin = ref(false);
  const admin = ref({
    userId: "",
    firstName: " ",
    lastName: " ",
    email: " ",
    role: " ",
  });

  const getAdminLoggedin = computed(() => {
    return adminLoggedin.value;
  });

  const getAdmin = computed(() => {
    return admin.value;
  });

  function setAdminLoggedin(status) {
    adminLoggedin.value = status;
  }

  function setAdmin(data) {
    admin.value.userId = data.userId;
    admin.value.firstName = data.firstName;
    admin.value.lastName = data.lastName;
    admin.value.email = data.email;
    admin.value.role = data.role;
  }

  function $reset() {
    adminLoggedin.value = false;
    admin.value.userId = " ";
    admin.value.firstName = " ";
    admin.value.lastName = " ";
    admin.value.email = " ";
    admin.value.role = " ";
  }

  return {
    adminLoggedin,
    getAdminLoggedin,
    setAdminLoggedin,
    admin,
    getAdmin,
    setAdmin,
    $reset,
  };
});
