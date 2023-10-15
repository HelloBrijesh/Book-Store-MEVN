import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useAuthStore = defineStore("authStore", () => {
  const isLoggedin = ref(false);
  const isAdmin = ref(false);

  const getisLoggedin = computed(() => {
    return isLoggedin.value;
  });

  const getisAdmin = computed(() => {
    return isAdmin.value;
  });

  function setisLoggedin(status) {
    isLoggedin.value = status;
  }

  function setisAdmin(status) {
    isAdmin.value = status;
  }

  function $reset() {
    isLoggedin.value = false;
    isAdmin.value = false;
  }

  return {
    isLoggedin,
    getisLoggedin,
    setisLoggedin,
    isAdmin,
    getisAdmin,
    setisAdmin,
    $reset,
  };
});
