import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
export const useUserStore = defineStore("userData", () => {
  const isLoggedin = ref(false);
  const access_token = ref(" ");
  const userId = ref(" ");
  const user = ref({
    firstName: " ",
    lastName: " ",
    email: " ",
    role: " ",
  });

  const getisLoggedin = computed(() => {
    return isLoggedin.value;
  });

  const getAccessToken = computed(() => {
    return access_token.value;
  });

  const getUserId = computed(() => {
    return userId.value;
  });

  const getUser = computed(() => {
    return user.value;
  });

  function setisLoggedin(status) {
    isLoggedin.value = status;
  }

  function setAccessToken(token) {
    access_token.value = token;
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

  function $reset() {
    isLoggedin.value = false;
    access_token.value = " ";
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
    access_token,
    getAccessToken,
    setAccessToken,
    userId,
    getUserId,
    setUserId,
    $reset,
  };
});
