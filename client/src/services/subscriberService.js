import { ref } from "vue";
import axios from "axios";

export default function useSubscriberService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);

  const addSubscriber = async (payload) => {
    url.value = `/api/subscribers`;
    status.value = null;
    error.value = null;
    try {
      const response = await axios.post(url.value, payload, {});
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    status,
    error,
    addSubscriber,
  };
}
