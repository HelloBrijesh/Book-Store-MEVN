import { ref } from "vue";
import axios from "axios";
import { axiosAuthInstance } from "../interceptors/axios";

export default function useUserService() {
  const url = ref(null);
  const userDetails = ref(null);
  const status = ref(null);
  const error = ref(null);

  const getUserDetails = async () => {
    url.value = "/api/user";
    status.value = null;
    error.value = null;
    userDetails.value = null;

    try {
      const response = await axiosAuthInstance.get(url.value);
      userDetails.value = response.data.userDetails;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const updateUserDetails = async (payload) => {
    url.value = "/api/user";
    status.value = null;
    error.value = null;
    userDetails.value = null;
    try {
      const response = await axiosAuthInstance.put(url.value, payload);
      userDetails.value = response.data.updatedUser;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const contactUs = async (payload) => {
    url.value = "/api/contact";
    status.value = null;
    error.value = null;
    userDetails.value = null;
    try {
      const response = await axios.post(url.value, payload);
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return {
    contactUs,
    getUserDetails,
    updateUserDetails,
    error,
    status,
    userDetails,
  };
}
