import { ref } from "vue";
import axios from "axios";

export default function useSubscribeService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);

  const addSubscriber = async (payload) => {
    url.value = `addsubscriber`;
    status.value = null;
    error.value = null;
    try {
      const response = await axios.post(url.value, payload, {});
      statusCode.value = response.status;
      books.value = response.data.searchedBooks;
      totalPages.value = response.data.totalPages;
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
