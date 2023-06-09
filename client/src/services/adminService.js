import { ref } from "vue";
import axios from "axios";

export default function useAdminService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);

  const addBook = async (addBookPayload) => {
    url.value = "admin";
    statusCode.value = null;
    error.value = null;

    try {
      const response = await axios.post(url.value, addBookPayload, {
        withCredentials: true,
      });
      statusCode.value = response.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return {
    addBook,
    error,
    statusCode,
  };
}
