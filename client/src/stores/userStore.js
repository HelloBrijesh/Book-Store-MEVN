import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useUserStore = defineStore("userStore", () => {
  const user = ref({
    userId: "",
    firstName: " ",
    lastName: " ",
    email: " ",
    role: " ",
  });

  const getUser = computed(() => {
    return user.value;
  });

  function setUser(data) {
    user.value.userId = data.userId;
    user.value.firstName = data.firstName;
    user.value.lastName = data.lastName;
    user.value.email = data.email;
    user.value.role = data.role;
  }

  function $reset() {
    user.value.userId = " ";
    user.value.firstName = " ";
    user.value.lastName = " ";
    user.value.email = " ";
    user.value.role = " ";
  }

  return {
    user,
    getUser,
    setUser,
    $reset,
  };
});
