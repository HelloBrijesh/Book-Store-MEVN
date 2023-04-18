import { ref } from "vue";
import axios from "axios";

export default function useOrderService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const orders = ref(null);

  const placeOrder = async (orderPayload) => {
    url.value = "placeorder";
    statusCode.value = null;
    error.value = null;
    orders.value = null;
    try {
      const response = await axios.post(url.value, orderPayload, {
        withCredentials: true,
      });
      statusCode.value = response.status;
      orders.value = response.data.orderId;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const getOrders = async () => {
    url.value = "getorders";
    statusCode.value = null;
    error.value = null;
    orders.value = null;
    try {
      const response = await axios.get(url.value);
      statusCode.value = response.status;
      orders.value = response.data.orders;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    statusCode,
    error,
    orders,
    placeOrder,
    getOrders,
  };
}
