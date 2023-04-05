import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useUserStore = defineStore("userStore", () => {
  const isLoggedin = ref(false);
  const userId = ref(" ");
  const accessToken = ref("");
  const user = ref({
    firstName: " ",
    lastName: " ",
    email: " ",
    role: " ",
  });

  const getisLoggedin = computed(() => {
    return isLoggedin.value;
  });

  const getUserId = computed(() => {
    return userId.value;
  });
  const getAccessToken = computed(() => {
    return accessToken.value;
  });

  const getUser = computed(() => {
    return user.value;
  });

  function setisLoggedin(status) {
    isLoggedin.value = status;
  }

  function setUserId(id) {
    userId.value = id;
  }

  function setUser(data) {
    user.value.firstName = data.firstName;
    user.value.lastName = data.lastName;
    user.value.email = data.email;
    user.value.role = data.role;
  }

  function setAccessToken(token) {
    accessToken.value = token;
  }

  function $reset() {
    isLoggedin.value = false;
    userId.value = " ";
    user.value.firstName = " ";
    user.value.lastName = " ";
    user.value.email = " ";
    user.value.role = " ";
  }

  return {
    isLoggedin,
    getisLoggedin,
    setisLoggedin,
    user,
    getUser,
    setUser,
    accessToken,
    getAccessToken,
    setAccessToken,
    userId,
    getUserId,
    setUserId,
    $reset,
  };
});
