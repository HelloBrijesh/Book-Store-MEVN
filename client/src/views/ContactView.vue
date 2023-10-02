<script setup></script>
<template>
  <div class="w-full py-20">
    <div class="sm:container sm:mx-auto mx-5">
      <div class="pb-10 sm:text-center">
        <h1 class="text-2xl">Contact</h1>
      </div>
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="" class="">
          <div class="space-y-5">
            <div>
              <label for="name" class="text-base font-medium text-gray-900">
                Name
              </label>
              <div class="mt-2">
                <input
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Name"
                  id="name"
                />
              </div>
            </div>
            <div>
              <label for="email" class="text-base font-medium text-gray-900">
                Email address
              </label>
              <div class="mt-2">
                <input
                  class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id="email"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="text-base font-medium text-gray-900"
                >
                  Message
                </label>
              </div>
              <div class="mt-2">
                <textarea
                  class="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Message"
                  id="message"
                  rows="9"
                  cols="33"
                ></textarea>
              </div>
            </div>
            <div class="text-center pt-8">
              <button
                type="submit"
                class="inline-flex w-2xl items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                Submit
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
