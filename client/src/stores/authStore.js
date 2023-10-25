import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useAuthStore = defineStore("authStore", () => {
  const isLoggedin = ref(false);
  const isAdmin = ref(false);
  const userImage = ref(null);

  const getisLoggedin = computed(() => {
    return isLoggedin.value;
  });

  const getisAdmin = computed(() => {
    return isAdmin.value;
  });
  const getUserImage = computed(() => {
    return userImage.value;
  });

  function setisLoggedin(status) {
    isLoggedin.value = status;
  }

  function setisAdmin(status) {
    isAdmin.value = status;
  }

  function setUserImage(imageUrl) {
    userImage.value = imageUrl;
  }

  function $reset() {
    isLoggedin.value = false;
    isAdmin.value = false;
    userImage.value = null;
  }

  return {
    isLoggedin,
    getisLoggedin,
    setisLoggedin,
    isAdmin,
    getisAdmin,
    setisAdmin,
    userImage,
    getUserImage,
    setUserImage,
    $reset,
  };
});
