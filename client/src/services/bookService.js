import { ref } from "vue";
import axios from "axios";

export default function useBookService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const book = ref(null);
  const listOfBooks = ref(null);
  const totalPages = ref(null);

  const getBookById = async (bookid) => {
    url.value = `book/${bookid}`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;
    try {
      const response = await axios.get(url.value);
      status.value = response.data.status;
      book.value = response.data.bookById;
      listOfBooks.value = response.data.relatedBooks;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const getAllBooks = async (page, payload) => {
    url.value = `shop?price=${payload.price}&page=${page}&category=${payload.category}`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axios.get(url.value);
      status.value = response.data.status;
      listOfBooks.value = response.data.books;
      totalPages.value = response.data.totalPages;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const getBestSellingBooks = async () => {
    url.value = "bestsellingbooks";
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axios.get(url.value);
      status.value = response.status;
      listOfBooks.value = response.data.bestSellingBooks;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const updateBook = async (payload, bookid) => {
    url.value = `updatebook/${bookid}`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axios.post(url.value, payload, {
        withCredentials: true,
      });
      status.value = response.data.status;
      book.value = response.data.book;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const deleteBook = async (bookid) => {
    url.value = `deletebook/${bookid}`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axios.delete(
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
  return {
    status,
    error,
    book,
    listOfBooks,
    totalPages,
    deleteBook,
    updateBook,
    getBookById,
    getAllBooks,
    getBestSellingBooks,
  };
}
