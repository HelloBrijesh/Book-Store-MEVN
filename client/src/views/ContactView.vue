<template>
  <div class="site-wrap">
    <Header></Header>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <RouterLink to="/">Home</RouterLink>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Contact</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="h3 mb-3 text-black">Get In Touch</h2>
          </div>
          <div class="col-md-7">
            <form @submit.prevent="handleContactUs">
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
                      name="firstName"
                      v-model="contactUsPayload.firstName"
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
                      name="lastName"
                      v-model="contactUsPayload.lastName"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="email" class="text-black"
                      >Email <span class="text-danger">*</span></label
                    >
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder=""
                      v-model="contactUsPayload.email"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="subject" class="text-black">Subject </label>
                    <input
                      type="text"
                      class="form-control"
                      id="subject"
                      name="subject"
                      v-model="contactUsPayload.subject"
                      required
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-md-12">
                    <label for="message" class="text-black">Message </label>
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="7"
                      class="form-control"
                      v-model="contactUsPayload.message"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-lg-12">
                    <input
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                      value="Send Message"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div
              v-if="error"
              class="text-danger text-center mt-3 font-weight-bold"
            >
              {{ error }}
            </div>
          </div>
          <div class="col-md-5 ml-auto">
            <div class="p-4 border mb-3">
              <span class="d-block text-primary h6 text-uppercase"
                >New York</span
              >
              <p class="mb-0">
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
            </div>
            <div class="p-4 border mb-3">
              <span class="d-block text-primary h6 text-uppercase">London</span>
              <p class="mb-0">
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
            </div>
            <div class="p-4 border mb-3">
              <span class="d-block text-primary h6 text-uppercase">Canada</span>
              <p class="mb-0">
                203 Fake St. Mountain View, San Francisco, California, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import useUserService from "../services/userService";

const { contactUs, error, statusCode } = useUserService();

const router = useRouter();
const contactUsPayload = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const handleContactUs = async () => {
  await contactUs(contactUsPayload.value);
  if (statusCode.value === "ok") {
    alert("Thank You contacting us");
    window.location.reload();
  }
};
</script>

<style scoped></style>
