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
      const response = await axios.get(url.value, {});
      statusCode.value = response.status;
      userDetail.value = response.data.userDetail;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return {
    getUser,
    error,
    userDetail,
    statusCode,
  };
}
