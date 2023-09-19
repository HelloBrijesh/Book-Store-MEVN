import { ref } from "vue";
import axios from "axios";

export default function useCartService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const cart = ref(null);

  const getCart = async () => {
    url.value = "getcart";
    status.value = null;
    error.value = null;
    cart.value = null;
    try {
      const response = await axios.get(url.value);
      status.value = response.status;
      cart.value = response.data.cartItems;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const addCartItems = async (bookid) => {
    url.value = `addcartitem?bookid=${bookid}&quantity=${1}`;
    status.value = null;
    error.value = null;
    cart.value = null;
    try {
      const response = await axios.post(
        url.value,
        {},
        {
          withCredentials: true,
        }
      );
      status.value = response.status;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const removeCartItems = async () => {
    url.value = "removecartitem";
    status.value = null;
    error.value = null;
    cart.value = null;
    try {
      const response = await axios.get(url.value);
      status.value = response.status;
      cart.value = response.data.cart;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    status,
    error,
    cart,
    addCartItems,
    removeCartItems,
    getCart,
  };
}
