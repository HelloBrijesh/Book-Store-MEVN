import { ref } from "vue";
import axios from "axios";
import { axiosAuthInstance } from "../interceptors/axios";

export default function useBookService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const book = ref(null);
  const listOfBooks = ref(null);
  const totalPages = ref(null);

  const getBookById = async (bookid) => {
    url.value = `/api/books/${bookid}`;
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
    url.value = `/api/books?price=${payload.price}&page=${page}&category=${payload.category}`;
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
    url.value = "/api/books/list/best-selling";
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axios.get(url.value);
      status.value = response.data.status;
      listOfBooks.value = response.data.bestSellingBooks;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const updateBook = async (payload, bookid) => {
    url.value = `/api/books/${bookid}`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axiosAuthInstance.put(url.value, payload);
      status.value = response.data.status;
      book.value = response.data.updatedBook;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const deleteBook = async (bookid) => {
    url.value = `/api/books/${bookid}`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axiosAuthInstance.delete(url.value, {});
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const searchBook = async (payload) => {
    url.value = `/api/searchbook`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axios.post(url.value, payload);
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const addBook = async (payload) => {
    url.value = `/api/books`;
    status.value = null;
    error.value = null;
    book.value = null;
    listOfBooks.value = null;
    totalPages.value = null;

    try {
      const response = await axiosAuthInstance.post(url.value, payload);
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
    addBook,
    deleteBook,
    searchBook,
    updateBook,
    getBookById,
    getAllBooks,
    getBestSellingBooks,
  };
}
