import { ref } from "vue";
import axios from "axios";

export default function useShopService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const books = ref(null);
  const totalPages = ref(null);

  const getBooks = async (shopPayload, currentPage) => {
    url.value = `shop/${currentPage}`;
    statusCode.value = null;
    error.value = null;
    books.value = null;
    totalPages.value = null;
    try {
      const response = await axios.post(url.value, shopPayload, {
        withCredentials: true,
      });
      statusCode.value = response.status;
      books.value = response.data.searchedBooks;
      totalPages.value = response.data.totalPages;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    statusCode,
    error,
    books,
    getBooks,
    totalPages,
  };
}
