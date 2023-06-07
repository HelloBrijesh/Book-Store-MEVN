import { ref } from "vue";
import axios from "axios";

export default function useUserService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const userDetail = ref({});

  const getUser = async () => {
    url.value = "user";
    statusCode.value = null;
    error.value = null;
    userDetail.value = {};
    try {
      const response = await axios.get(url.value, {
        withCredentials: true,
      });
      statusCode.value = response.status;
      userDetail.value = response.data.userDetail;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const updateEmail = async (updateEmailPayload) => {
    url.value = "updateemail";
    statusCode.value = null;
    error.value = null;
    userDetail.value = {};
    try {
      const response = await axios.post(url.value, updateEmailPayload, {
        withCredentials: true,
      });
      statusCode.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const deleteUser = async () => {
    url.value = "deleteuser";
    statusCode.value = null;
    error.value = null;
    userDetail.value = {};
    try {
      const response = await axios.get(url.value, {
        withCredentials: true,
      });
      statusCode.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return {
    getUser,
    updateEmail,
    deleteUser,
    error,
    userDetail,
    statusCode,
  };
}
