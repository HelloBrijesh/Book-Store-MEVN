import { ref } from "vue";
import axios from "axios";

export default function useBookService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const book = ref(null);
  const listOfBooks = ref(null);

  const getBookDetails = async (bookid) => {
    url.value = `bookdetails/${bookid}`;
    statusCode.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;

    try {
      const response = await axios.get(url.value);
      statusCode.value = response.status;
      book.value = response.data.searchedBook[0];
      listOfBooks.value = response.data.relatedBooks;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const deleteBook = async (bookid) => {
    url.value = `deletebook/${bookid}`;
    statusCode.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    try {
      const response = await axios.delete(url.value);
      statusCode.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const bestSellingBooks = async () => {
    url.value = "bestsellingbooks";
    statusCode.value = null;
    error.value = null;
    listOfBooks.value = null;

    try {
      const response = await axios.get(url.value);
      statusCode.value = response.status;
      listOfBooks.value = response.data.listOfBooks;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    statusCode,
    error,
    book,
    listOfBooks,
    deleteBook,
    getBookDetails,
    bestSellingBooks,
  };
}
