<template>
  <footer class="site-footer border-top">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="block-5 mb-2">
            <h3 class="footer-heading mb-4">Contact Info</h3>
            <ul class="list-unstyled">
              <li class="address">
                203 Fake St. Mountain View, San Francisco, California, USA
              </li>
              <li class="phone">
                <a href="tel://23923929210">+2 392 3929 210</a>
              </li>
              <li class="email">emailaddress@domain.com</li>
            </ul>
          </div>
        </div>
        <div class="col-md-4 mb-2 mb-lg-0">
          <ul class="list-unstyled">
            <li><RouterLink to="/about">About Us</RouterLink></li>
            <li><RouterLink to="/track">Track order</RouterLink></li>
            <li><RouterLink to="/help">Help</RouterLink></li>
            <li><RouterLink to="/shop">Shop</RouterLink></li>
            <li><RouterLink to="/contact">Contact US</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-4 mb-2 mb-lg-0">
          <div class="block-7">
            <form action="#" method="post">
              <label for="email_subscribe" class="footer-heading"
                >Track Order</label
              >
              <div class="form-group">
                <input
                  type="text"
                  class="form-control py-4"
                  id="email_subscribe"
                  placeholder="Order No"
                />
                <input
                  type="submit"
                  class="btn btn-sm btn-primary"
                  value="Send"
                />
              </div>
            </form>
          </div>
          <div class="block-7">
            <form action="#" method="post">
              <label for="email_subscribe" class="footer-heading"
                >Subscribe</label
              >
              <div class="form-group">
                <input
                  type="text"
                  class="form-control py-4"
                  id="email_subscribe"
                  placeholder="Email"
                />
                <input
                  type="submit"
                  class="btn btn-sm btn-primary"
                  value="Send"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row pt-5 mt-3 text-center">
        <div class="col-md-12">
          <p>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            Copyright &copy;

            <!-- <script
              data-cfasync="false"
              src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"
            ></script>
            <script>
              document.write(new Date().getFullYear());
            </script> -->
            {{ date }}
            All rights reserved | This template is made with
            <i class="icon-heart" aria-hidden="true"></i>
            by
            <a href="https://colorlib.com" target="_blank" class="text-primary">
              Colorlib
            </a>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
const date = new Date().getFullYear();
</script>

<style lang="scss" scoped></style>
