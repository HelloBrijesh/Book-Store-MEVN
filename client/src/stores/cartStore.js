import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useCartStore = defineStore("cartStore", () => {
  const cartItems = ref([]);
  const totalItems = ref(0);
  const cartTotal = ref(0);

  const getCartItems = computed(() => {
    return cartItems.value;
  });
  const getTotalItems = computed(() => {
    return totalItems.value;
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

  function setTotalItems(total) {
    totalItems.value = total;
  }

  function setCartTotal(total) {
    cartTotal.value = total;
  }
  function $reset() {
    cartItems.value = [];
    cartTotal.value = 0;
    totalItems.value = 0;
  }

  return {
    cartItems,
    totalItems,
    getCartItems,
    getTotalItems,
    cartTotal,
    setTotalItems,
    setCartItems,
    setCartTotal,
    getCartTotal,
    $reset,
  };
});
