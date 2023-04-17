import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useOrderStore = defineStore("orderStore", () => {
  const listOfOrders = ref([]);

  const getOrders = computed(() => {
    return listOfOrders.value;
  });

  function setOrders(orderId) {
    listOfOrders.value.push(orderId);
  }

  function $reset() {
    listOfOrders.value = [];
  }

  return {
    listOfOrders,
    getOrders,
    setOrders,
    $reset,
  };
});
