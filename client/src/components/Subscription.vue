<script setup>
import { ref } from "vue";
import useSubscriberService from "../services/subscriberService";

const subscriberService = useSubscriberService();

const subscriberPayload = ref({
  email: "",
});

const handleSubcribe = async () => {
  await subscriberService.addSubscriber(subscriberPayload.value);
  if (subscriberService.status.value === "ok") {
    alert("subscribed successfully");
  } else {
    alert(subscriberService.error.value);
  }
};
</script>
<template>
  <div class="w-full mb-28">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="flex items-center sm:flex-row flex-col">
        <div class="sm:w-2/4 mb-10 sm:mb-0">
          <h2 class="text-3xl font-bold text-black text-center sm:text-left">
            Sign up for our weekly newsletter
          </h2>
          <p class="mt-4 text-gray-600 text-center sm:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            ipsum eu nunc commodo posuere et sit amet ligula.
          </p>
        </div>
        <div class="sm:w-2/4">
          <form @submit.prevent="handleSubcribe" class="flex lg:justify-center">
            <div class="flex w-full max-w-md flex-col space-y-4">
              <input
                class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                v-model="subscriberPayload.email"
              />
              <button
                type="submit"
                class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Subscribe
              </button>
              <p class="mt-2 text-center sm:text-left">
                <span class="text-gray-600">
                  By signing up, you agree to our terms of service and privacy
                  policy.
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
