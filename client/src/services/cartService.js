import { ref } from "vue";
import { axiosAuthInstance } from "../interceptors/axios";

export default function useCartService() {
  const url = ref(null);
  const status = ref(null);
  const error = ref(null);
  const cart = ref(null);
  const cartItems = ref(null);

  const getCart = async () => {
    url.value = "/api/cart";
    status.value = null;
    error.value = null;
    cart.value = null;
    cartItems.value = null;
    try {
      const response = await axiosAuthInstance.get(url.value);
      status.value = response.data.status;
      cart.value = response.data.cart;
      cartItems.value = response.data.cart.books;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const addItemsInCart = async (bookid, quantity) => {
    url.value = `/api/cart/item?bookid=${bookid}&quantity=${quantity}`;
    status.value = null;
    error.value = null;
    cart.value = null;
    cartItems.value = null;
    try {
      const response = await axiosAuthInstance.put(url.value, {});
      status.value = response.data.status;
      cart.value = response.data.updatedCart;
      cartItems.value = response.data.updatedCart.books;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  const removeCartItems = async (bookid, quantity, price) => {
    url.value = `/api/cart/item?bookid=${bookid}&quantity=${quantity}&price=${price}`;
    status.value = null;
    error.value = null;
    cart.value = null;
    cartItems.value = null;
    try {
      const response = await axiosAuthInstance.delete(url.value, {});
      status.value = response.data.status;
      cart.value = response.data.updatedCart;
      cartItems.value = response.data.updatedCart.books;
    } catch (err) {
      error.value = err.response.data.message;
    }
  };
  return {
    status,
    error,
    cart,
    cartItems,
    addItemsInCart,
    removeCartItems,
    getCart,
  };
}
