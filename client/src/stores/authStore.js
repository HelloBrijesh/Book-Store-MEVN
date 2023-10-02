import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useAuthStore = defineStore("authStore", () => {
  const isLoggedin = ref(false);
  // const sessionDetails = ref({});

  const getisLoggedin = computed(() => {
    return isLoggedin.value;
  });

  // const getSessionDetails = computed(() => {
  //   return sessionDetails.value;
  // });

  function setisLoggedin(status) {
    isLoggedin.value = status;
  }

  // function setSessionDetails(data) {
  //   sessionDetails.value = data;
  // }

  function $reset() {
    isLoggedin.value = false;
    // sessionDetails.value = null;
  }

  return {
    isLoggedin,
    getisLoggedin,
    setisLoggedin,
    // sessionDetails,
    // getSessionDetails,
    // setSessionDetails,
    $reset,
  };
});
