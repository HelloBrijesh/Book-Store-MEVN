import { ref } from "vue";
import axios from "axios";

export default function useSignUpService() {
  const url = "http://localhost:5000/api/signup";
  const userId = ref(null);
  const error = ref(null);

  const signUp = async (signUpData) => {
    try {
      const response = await axios.post(url, signUpData, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      userId.value = response.data.userId;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    signUp,
    error,
    userId,
  };
}
