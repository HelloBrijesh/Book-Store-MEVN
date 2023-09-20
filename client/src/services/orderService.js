import { ref } from "vue";
import axios from "axios";

export default function useOrderService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const orders = ref(null);

  const getOrders = async () => {
    url.value = `getcart`;
    status.value = null;
    error.value = null;
    orders.value = null;
    try {
      const response = await axios.get(url.value);
      status.value = response.status;
      orders.value = response.data.cart;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const placeOrder = async () => {
    url.value = `placeorder`;
    status.value = null;
    error.value = null;
    orders.value = null;
    try {
      const response = await axios.post(
        url.value,
        {},
        {
          withCredentials: true,
        }
      );
      status.value = response.data.status;
      orders.value = response.data.savedOrder;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    status,
    error,
    orders,
    getOrders,
    placeOrder,
  };
}
