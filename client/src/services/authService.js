import { ref } from "vue";
import axios from "axios";
import { axiosAuthInstance } from "../interceptors/axios";

export default function useAuthService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const role = ref(null);

  const signup = async (signUpPayload) => {
    url.value = "/api/signup";
    status.value = null;
    error.value = null;
    role.value = null;
    try {
      const response = await axios.post(url.value, signUpPayload);
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const verifyEmail = async (token) => {
    url.value = `/api/email?token=${token}`;
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
      axiosAuthInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const forgotPassword = async (payload) => {
    url.value = "/api/forgotpassword";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axiosAuthInstance.post(url.value, payload);
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const login = async (logInPayload) => {
    url.value = "/api/login";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axios.post(url.value, logInPayload, {
        withCredentials: true,
      });
      axiosAuthInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      role.value = response.data.role;
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const logout = async () => {
    url.value = "/api/logout";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      axiosAuthInstance.defaults.headers.common["Authorization"] = "";
      const response = await axios.put(
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
    url.value = "/api/user/password";
    status.value = null;
    error.value = null;
    role.value = null;

    try {
      const response = await axiosAuthInstance.put(
        url.value,
        changePasswordPayload
      );
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
