<script setup></script>
<template>
  <div class="w-full mb-28">
    <div class="container mx-auto">
      <div class="flex">
        <div class="w-2/4">
          <h2 class="text-3xl font-bold text-black">
            Sign up for our weekly newsletter
          </h2>
          <p class="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            ipsum eu nunc commodo posuere et sit amet ligula.
          </p>
        </div>
        <div class="w-2/4">
          <form class="flex lg:justify-center">
            <div class="flex w-full max-w-md flex-col space-y-4">
              <input
                class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
              />
              <button
                type="button"
                class="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Subscribe
              </button>
              <p class="mt-2 lg:text-center">
                <span class="text-sm text-gray-600">
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
