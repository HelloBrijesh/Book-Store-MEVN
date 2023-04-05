import axios from "axios";
import { ref } from "vue";
export default function useLogInService() {
  const url = "http://localhost:5000/api/login";
  const userId = ref(null);
  const error = ref(null);
  const logIn = async (logInData) => {
    try {
      const response = await axios.post(url, logInData, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      userId.value = response.data.userId;
    } catch (err) {
      error.value = err.response.data.message;
      console.log(error.value);
    }
  };
  return {
    logIn,
    error,
    userId,
  };
}
