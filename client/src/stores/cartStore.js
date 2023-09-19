// import { defineStore } from "pinia";
// import { ref, computed } from "vue";
// export const useCartStore = defineStore("cartStore", () => {
//   const cartItems = ref([]);
//   const cartTotal = ref();

//   const getCartItems = computed(() => {
//     return cartItems.value;
//   });

//   const getCartTotal = computed(() => {
//     return getTotal(getCartItems.value);
//   });

//   // const getTotal = (items) => {
//   //   let total = 0;
//   //   for (let i = 0; i < items.length; i++) {
//   //     total = total + items[i].price * items[i].quantity;
//   //   }
//   //   return total;
//   // };

//   function setCartItems(item) {
//     cartItems.value.push(item);
//   }
//   function $reset() {
//     cartItems.value = [];
//   }

//   return {
//     cartItems,
//     getCartItems,
//     setCartItems,
//     cartTotal,
//     getCartTotal,
//     $reset,
//   };
// });
