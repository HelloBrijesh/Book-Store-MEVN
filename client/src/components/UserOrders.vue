<template>
  <h3>No of Orders : {{ totalOrders }}</h3>
  <hr />
  <div class="pt-0 p-3 mb-3">
    <div v-for="order in orders">
      <div class="font-weight-bold text-right">
        <span>OrderNo : {{ order._id }}</span>
      </div>
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

    <!-- <div>
      <h5>List of Items</h5>
      
    </div> -->
    <!-- <div>
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
    </div> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useOrderService from "../services/orderService";

const { getOrders, error, statusCode, orders } = useOrderService();
let totalOrders = ref(null);
onMounted(async () => {
  await getOrders();
  totalOrders.value = orders.value.length;
});
</script>

<style scoped></style>
