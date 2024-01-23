import { ref } from "vue";
import { axiosAuthInstance } from "../interceptors/axios";

export default function useOrderService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const orders = ref(null);
  const totalOrders = ref(null);
  const salesData = ref(null);
  const totalData = ref(null);
  const checkOutUrl = ref(null);

  const getOrders = async (currentPage, orderId = "") => {
    url.value = `/api/orders?currentpage=${currentPage}&orderId=${orderId}`;
    status.value = null;
    error.value = null;
    orders.value = null;
    totalOrders.value = null;
    salesData.value = null;
    totalData.value = null;
    checkOutUrl.value = null;

    try {
      const response = await axiosAuthInstance.get(url.value);
      status.value = response.data.status;
      orders.value = response.data.orders;
      totalOrders.value = response.data.totalOrders;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const placeOrder = async (payload) => {
    url.value = `/api/orders`;
    status.value = null;
    error.value = null;
    orders.value = null;
    totalOrders.value = null;
    salesData.value = null;
    totalData.value = null;
    checkOutUrl.value = null;

    try {
      const response = await axiosAuthInstance.post(url.value, payload);
      status.value = response.data.status;
      orders.value = response.data.createdOrder.id;
      checkOutUrl.value = response.data.url;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };

  const getSalesData = async (payload, page) => {
    url.value = `/api/orders/sales?startDate=${payload.startDate}&endDate=${payload.endDate}&page=${page}`;
    status.value = null;
    error.value = null;
    orders.value = null;
    totalOrders.value = null;
    salesData.value = null;
    totalData.value = null;
    checkOutUrl.value = null;

    try {
      const response = await axiosAuthInstance.get(url.value);
      salesData.value = response.data.salesData;
      totalData.value = response.data.totalData;
      status.value = response.data.status;
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
    checkOutUrl,
    getSalesData,
    getOrders,
    placeOrder,
  };
}
