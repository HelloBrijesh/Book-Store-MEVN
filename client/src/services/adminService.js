import { ref } from "vue";
import axios from "axios";

export default function useAdminService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const adminDetail = ref({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const adminLogin = async (adminLogInPayload) => {
    url.value = "adminlogin";
    statusCode.value = null;
    error.value = null;
    adminDetail.value = { userId: "", firstName: "", lastName: "", email: "", role: "" };

    try {
      const response = await axios.post(url.value, adminLogInPayload, {
        withCredentials: true,
      });
      statusCode.value = response.status;
      adminDetail.value = response.data.adminDetail;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const adminLogout = async () => {
    url.value = "adminlogout";
    statusCode.value = null;
    error.value = null;
    adminDetail.value = { userId: "", firstName: "", lastName: "", email: "", role: "" };

    try {
      axios.defaults.headers.common["Authorization"] = "";
      const response = await axios.post(url.value, {}, { withCredentials: true });
      statusCode.value = response.data.status;
    } catch (err) {
      error.value = err;
    }
  };

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
    adminLogin,
    adminLogout,
    adminDetail,
    addBook,
    error,
    statusCode,
  };
}
