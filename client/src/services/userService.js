import { ref } from "vue";
import axios from "axios";

export default function useUserService() {
  const url = ref(null);
  const userDetails = ref(null);
  const status = ref(null);
  const error = ref(null);

  const getUserDetails = async () => {
    url.value = "userdetails";
    status.value = null;
    error.value = null;
    userDetails.value = null;

    try {
      const response = await axios.get(url.value);
      userDetails.value = response.data.userDetails;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const updateUserDetails = async (payload) => {
    url.value = "updateuser";
    status.value = null;
    error.value = null;
    userDetails.value = null;
    try {
      const response = await axios.post(url.value, payload, {
        withCredentials: true,
      });
      userDetails.value = response.data.userDetails;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return {
    getUserDetails,
    updateUserDetails,
    error,
    status,
    userDetails,
  };
}
