import { ref } from "vue";
import axios from "axios";

export default function useOrderService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const orders = ref(null);
  const totalOrders = ref(null);
  const salesData = ref(null);
  const totalData = ref(null);

  const getOrders = async (currentPage, orderId = "") => {
    url.value = `orders?currentpage=${currentPage}&orderId=${orderId}`;
    status.value = null;
    error.value = null;
    orders.value = null;
    totalOrders.value = null;
    salesData.value = null;
    totalData.value = null;

    try {
      const response = await axios.get(url.value);
      status.value = response.data.status;
      orders.value = response.data.orders;
      totalOrders.value = response.data.totalOrders;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const placeOrder = async (payload) => {
    url.value = `orders`;
    status.value = null;
    error.value = null;
    orders.value = null;
    totalOrders.value = null;
    salesData.value = null;
    totalData.value = null;

    try {
      const response = await axios.post(url.value, payload, {
        withCredentials: true,
      });
      status.value = response.data.status;
      orders.value = response.data.createdOrder.id;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const getSalesData = async (payload, page) => {
    url.value = `orders/sales?startDate=${payload.startDate}&endDate=${payload.endDate}&page=${page}`;
    status.value = null;
    error.value = null;
    orders.value = null;
    totalOrders.value = null;
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
    orders,
    totalOrders,
    salesData,
    totalData,
    getSalesData,
    getOrders,
    placeOrder,
  };
}
