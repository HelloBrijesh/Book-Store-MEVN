import { ref } from "vue";
import axios from "axios";

export default function useAuthService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const authDetail = ref({});

  const signUp = async (signUpPayload) => {
    url.value = "signup";
    statusCode.value = null;
    error.value = null;
    authDetail.value = {};

    try {
      const response = await axios.post(url.value, signUpPayload, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      statusCode.value = response.status;
      authDetail.value = response.data.authDetail;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const login = async (logInPayload) => {
    url.value = "login";
    statusCode.value = null;
    error.value = null;
    authDetail.value = {};
    try {
      const response = await axios.post(url.value, logInPayload, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      statusCode.value = response.status;
      authDetail.value = response.data.authDetail;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const logout = async () => {
    url.value = "logout";
    statusCode.value = null;
    error.value = null;
    authDetail.value = {};

    try {
      axios.defaults.headers.common["Authorization"] = "";
      const response = await axios.post(
        url.value,
        {},
        { withCredentials: true }
      );
      statusCode.value = response.data.status;
    } catch (err) {
      error.value = err;
    }
  };

  return {
    signUp,
    login,
    logout,
    error,
    authDetail,
    statusCode,
  };
}
