import { ref } from "vue";
import axios from "axios";

export default function useAuthService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const role = ref(null);
  const signup = async (signUpPayload) => {
    url.value = "signup";
    status.value = null;
    error.value = null;
    role.value = null;
    try {
      const response = await axios.post(url.value, signUpPayload, {
        withCredentials: true,
      });
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const verifyEmail = async (token) => {
    url.value = `email?token=${token}`;
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axios.post(
        url.value,
        {},
        {
          withCredentials: true,
        }
      );
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const forgotPassword = async (payload) => {
    url.value = "forgotpassword";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axios.post(url.value, payload, {
        withCredentials: true,
      });
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const login = async (logInPayload) => {
    url.value = "login";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axios.post(url.value, logInPayload, {
        withCredentials: true,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      role.value = response.data.role;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const logout = async () => {
    url.value = "logout";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      axios.defaults.headers.common["Authorization"] = "";
      const response = await axios.post(
        url.value,
        {},
        { withCredentials: true }
      );
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const changePassword = async (changePasswordPayload) => {
    url.value = "user/password";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axios.put(url.value, changePasswordPayload, {
        withCredentials: true,
      });
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    signup,
    login,
    forgotPassword,
    verifyEmail,
    logout,
    changePassword,
    role,
    error,
    status,
  };
}
