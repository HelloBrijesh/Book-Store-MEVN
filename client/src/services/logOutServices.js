import axios from "axios";
import { ref } from "vue";

export default function useLogOutService() {
  const url = "http://localhost:5000/api/logout";
  const status = ref(null);
  const error = ref(null);

  const logOut = async () => {
    try {
      const response = await axios.post(url, {}, { withCredentials: true });
      axios.defaults.headers.common["Authorization"] = "";
      console.log("logout res :", response);
      status.value = response.data.status;
    } catch (err) {
      error.value = err;
    }
  };
  return {
    logOut,
    status,
    error,
  };
}
