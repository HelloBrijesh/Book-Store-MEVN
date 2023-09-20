import { ref } from "vue";
import axios from "axios";

export default function useCartService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const cart = ref(null);
  const cartItems = ref(null);

  const getCart = async () => {
    url.value = "getcart";
    status.value = null;
    error.value = null;
    cart.value = null;
    cartItems.value = null;
    try {
      const response = await axios.get(url.value);
      status.value = response.status;
      cart.value = response.data.cart;
      cartItems.value = response.data.cart.books;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const addCartItems = async (bookid, quantity) => {
    url.value = `addcartitem?bookid=${bookid}&quantity=${quantity}`;
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
  const removeCartItems = async (bookid, quantity, price) => {
    url.value = `removecartitem?bookid=${bookid}&quantity=${quantity}&price=${price}`;
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
      status.value = response.data.status;
      cart.value = response.data.cart;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    status,
    error,
    cart,
    cartItems,
    addCartItems,
    removeCartItems,
    getCart,
  };
}
