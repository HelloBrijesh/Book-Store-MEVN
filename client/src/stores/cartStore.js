import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useCartStore = defineStore("cartStore", () => {
  const cartItems = ref([]);
  const cartTotal = ref();

  const getCartItems = computed(() => {
    return cartItems.value;
  });

  const getCartTotal = computed(() => {
    return cartTotal.value;
  });

  // const getTotal = (items) => {
  //   let total = 0;
  //   for (let i = 0; i < items.length; i++) {
  //     total = total + items[i].price * items[i].quantity;
  //   }
  //   return total;
  // };

  function setCartItems(items) {
    cartItems.value = items;
  }
  function setCartTotal(total) {
    cartTotal.value = total;
  }
  function $reset() {
    cartItems.value = [];
    cartTotal.value = null;
  }

  return {
    cartItems,
    getCartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
    getCartTotal,
    $reset,
  };
});
