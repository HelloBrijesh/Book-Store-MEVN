<template>
  <div>Total Orders : {{ totalOrders }}</div>

  <div v-for="order in orders" class="border p-3 mb-3">
    <div>
      <h5>List of Items</h5>
      <table class="table site-block-order-table mb-5">
        <thead>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr v-for="item in order.orderedItems">
            <td>{{ item.bookName }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.price }}</td>
            <td>${{ item.price * item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h5>Shipping Address</h5>
      <p class="mb-0">
        {{ order.billingDetail.firstName }} {{ order.billingDetail.lastName }}
      </p>
      <p class="mb-0">
        {{ order.billingDetail.address }}, {{ order.billingDetail.state }} ,
        {{ order.billingDetail.postalCode }}
      </p>
      <p class="mb-0">E mail : {{ order.billingDetail.email }}</p>
      <p class="mb-0">Phone : {{ order.billingDetail.phone }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useOrderService from "../services/orderService";

const { getOrders, error, statusCode, orders } = useOrderService();
onMounted(async () => {
  await getOrders();
  console.log(orders.value);
  totalOrders = orders.value.length;
});
let totalOrders = ref(null);
</script>

<style scoped></style>
