<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <RouterLink to="/">Home</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <RouterLink to="/cart">Cart</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Checkout</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <form @submit.prevent="handlePlaceOrder">
          <div class="row">
            <div class="col-md-6 mb-5 mb-md-0">
              <h2 class="h3 mb-3 text-black">Billing Details</h2>
              <div class="p-3 p-lg-5 border">
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="firstName" class="text-black"
                      >First Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="billingDetails.firstName"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="lastName" class="text-black"
                      >Last Name <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="billingDetails.lastName"
                      required
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="address" class="text-black"
                      >Address <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      v-model="billingDetails.address"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="state" class="text-black"
                      >State<span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="state"
                      v-model="billingDetails.state"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="postalCode" class="text-black"
                      >Postal <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="postalCode"
                      v-model="billingDetails.postalCode"
                      required
                    />
                  </div>
                </div>

                <div class="form-group row mb-5">
                  <div class="col-md-6">
                    <label for="email" class="text-black"
                      >Email Address <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      v-model="billingDetails.email"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="phone" class="text-black"
                      >Phone <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      v-model="billingDetails.phone"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="orderNotes" class="text-black">Order Notes</label>
                  <textarea
                    name="orderNotes"
                    id="orderNotes"
                    cols="30"
                    rows="5"
                    class="form-control"
                    placeholder="Write your notes here..."
                    v-model="billingDetails.orderNotes"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row mb-5">
                <div class="col-md-12">
                  <h2 class="h3 mb-3 text-black">Your Order</h2>
                  <div class="p-3 p-lg-5 border">
                    <table class="table site-block-order-table mb-5">
                      <thead>
                        <th>Product</th>
                        <th>Total</th>
                      </thead>
                      <tbody>
                        <tr v-for="item in cart">
                          <td>
                            {{ item.bookName }} <strong class="mx-2">x</strong>
                            {{ item.quantity }}
                          </td>
                          <td>${{ item.price * item.quantity }}</td>
                        </tr>
                        <tr>
                          <td class="text-black font-weight-bold">
                            <strong>Cart Subtotal</strong>
                          </td>
                          <td class="text-black">
                            ${{ cartStore.getCartTotal }}
                          </td>
                        </tr>
                        <tr>
                          <td class="text-black font-weight-bold">
                            <strong>Order Total</strong>
                          </td>
                          <td class="text-black font-weight-bold">
                            <strong>${{ cartStore.getCartTotal }}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="form-group">
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg py-3 btn-block"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- </form> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { onMounted, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { useOrderStore } from "../stores/orderStore";
import useOrderService from "../services/orderService";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const { placeOrder, error, statusCode, orders } = useOrderService();

const cart = cartStore.getCartItems;

const billingDetails = ref({
  firstName: "",
  lastName: "",
  address: "",
  state: "",
  postalCode: "",
  email: "",
  phone: "",
  orderNotes: "",
});

const orderPayLoad = ref({
  user: authStore.getSessionDetails,
  cart: cartStore.getCartItems,
  cartTotal: cartStore.getCartTotal,
  billingDetails: billingDetails.value,
});

const handlePlaceOrder = async () => {
  await placeOrder(orderPayLoad);
  orderStore.setOrders(orders.value);
  cartStore.$reset();
  router.push("/thankyou");
};

onMounted(async () => {
  if (!authStore.getisLoggedin) {
    await router.push("/login");
  }
});
</script>

<style scoped></style>
