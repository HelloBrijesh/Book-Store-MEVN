import { ref } from "vue";
import axios from "axios";

export default function useOrderService() {
  const url = ref(null);
  const statusCode = ref(null);
  const error = ref(null);
  const order = ref(null);

  const getOrders = async (orderPayload) => {
    url.value = "placeorder";
    statusCode.value = null;
    error.value = null;
    order.value = null;
    try {
      const response = await axios.post(url.value, orderPayload, {
        withCredentials: true,
      });
      statusCode.value = response.status;
      order.value = response.data.confirmedOrder;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    statusCode,
    error,
    order,
    getOrders,
  };
}
