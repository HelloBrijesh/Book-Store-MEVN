import { ref } from "vue";
import axios from "axios";

export default function useBookService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const book = ref(null);
  const relatedBooks = ref(null);

  const getBookDetails = async (bookid) => {
    url.value = `bookdetails/${bookid}`;
    statusCode.value = null;
    error.value = null;
    book.value = null;
    relatedBooks.value=null;

    try {
      const response = await axios.get(url.value);
      statusCode.value = response.status;
      book.value = response.data.searchedBook[0];
      relatedBooks.value = response.data.relatedBooks;
      
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    statusCode,
    error,
    book,
    relatedBooks,
    getBookDetails,
  };
}
