import { ref } from "vue";
import axios from "axios";

export default function useAdminService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const salesData = ref(null);
  const totalData = ref(null);

  const addBook = async (payload) => {
    url.value = `addbook`;
    status.value = null;
    error.value = null;
    salesData.value = null;
    totalData.value = null;
    try {
      const response = await axios.post(url.value, payload, {
        withCredentials: true,
      });
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const searchBook = async (payload) => {
    url.value = `searchbook`;
    status.value = null;
    error.value = null;
    salesData.value = null;
    totalData.value = null;

    try {
      const response = await axios.post(url.value, payload, {
        withCredentials: true,
      });
      status.value = response.data.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const getSalesData = async (payload, page) => {
    url.value = `salesdata?startDate=${payload.startDate}&endDate=${payload.endDate}&page=${page}`;
    status.value = null;
    error.value = null;
    salesData.value = null;
    totalData.value = null;

    try {
      const response = await axios.get(url.value);
      salesData.value = response.data.salesData;
      status.value = response.data.status;
      totalData.value = response.data.totalData;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    status,
    error,
    addBook,
    searchBook,
    salesData,
    getSalesData,
    totalData,
  };
}
