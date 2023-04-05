import axios from "axios";
import { ref } from "vue";

export default function useUserService() {
  const url = "http://localhost:5000/api/user";
  const firstName = ref(null);
  const error = ref(null);

  const getUser = async () => {
    try {
      const response = await axios.get(url, {});
      console.log(response);
      firstName.value = response.data.userDetail.firstName;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  return {
    firstName,
    error,
    getUser,
  };
}
