<script setup></script>
<template>
  <section class="w-full">
    <div class="mx-auto max-w-7xl px-2 py-10 lg:px-10">
      <div class="md:flex md:flex-row md:items-start md:justify-between">
        <div>
          <h1 class="text-xl font-bold">Products</h1>
        </div>
        <div class="mt-6 flex items-center pt-2 md:mt-0 md:space-x-4 md:pt-0">
          <button
            type="button"
            class="hidden items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:inline-flex"
          >
            Sort
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 h-4 w-4"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          >
            Category{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 h-4 w-4"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          >
            Color{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 h-4 w-4"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          >
            Size{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2 h-4 w-4"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <hr class="my-8" />
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div class="hidden space-y-6 divide-y lg:col-span-3 lg:block">
          <div class="pt-6">
            <h3 class="text-lg font-semibold text-gray-900">Color</h3>
            <ul class="mt-2">
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="color-white"
                    name="color[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="white"
                  />
                  <label
                    for="color-white"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    White
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="color-beige"
                    name="color[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="beige"
                  />
                  <label
                    for="color-beige"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Beige
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="color-blue"
                    name="color[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="blue"
                  />
                  <label
                    for="color-blue"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Blue
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="color-brown"
                    name="color[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="brown"
                  />
                  <label
                    for="color-brown"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Brown
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="color-green"
                    name="color[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="green"
                  />
                  <label
                    for="color-green"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Green
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="color-purple"
                    name="color[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="purple"
                  />
                  <label
                    for="color-purple"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Purple
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="pt-6">
            <h3 class="text-lg font-semibold text-gray-900">Category</h3>
            <ul class="mt-2">
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="category-new-arrivals"
                    name="category[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="new-arrivals"
                  />
                  <label
                    for="category-new-arrivals"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    All New Arrivals
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="category-tees"
                    name="category[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="tees"
                  />
                  <label
                    for="category-tees"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Tees
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="category-crewnecks"
                    name="category[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="crewnecks"
                  />
                  <label
                    for="category-crewnecks"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Crewnecks
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="category-sweatshirts"
                    name="category[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="sweatshirts"
                  />
                  <label
                    for="category-sweatshirts"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Sweatshirts
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="category-pants-shorts"
                    name="category[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="pants-shorts"
                  />
                  <label
                    for="category-pants-shorts"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    Pants &amp; Shorts
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div class="pt-6">
            <h3 class="text-lg font-semibold text-gray-900">Sizes</h3>
            <ul class="mt-2">
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="sizes-xs"
                    name="sizes[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="xs"
                  />
                  <label
                    for="sizes-xs"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    XS
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="sizes-s"
                    name="sizes[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="s"
                  />
                  <label
                    for="sizes-s"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    S
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="sizes-m"
                    name="sizes[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="m"
                  />
                  <label
                    for="sizes-m"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    M
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="sizes-l"
                    name="sizes[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="l"
                  />
                  <label
                    for="sizes-l"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    L
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="sizes-xl"
                    name="sizes[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="xl"
                  />
                  <label
                    for="sizes-xl"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    XL
                  </label>
                </div>
              </li>
              <li class="flex items-center justify-between py-2">
                <div class="flex items-center">
                  <input
                    id="sizes-2xl"
                    name="sizes[]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    value="2xl"
                  />
                  <label
                    for="sizes-2xl"
                    class="ml-3 text-sm font-medium text-gray-900"
                  >
                    2XL
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="w-full rounded-lg border-2 border-dashed px-2 lg:col-span-9"
        >
          <div
            class="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4"
          >
            <div class="rounded-md border">
              <img
                src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                alt="Laptop"
                class="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
              />
              <div class="p-4">
                <h1 class="inline-flex items-center text-lg font-semibold">
                  Nike Airmax v2
                </h1>
                <p class="mt-3 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi, debitis?
                </p>
                <div class="mt-4">
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Sneakers
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Nike
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Airmax
                  </span>
                </div>
                <div class="mt-3 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Colors : </span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"
                  ></span>
                </div>
                <div class="mt-5 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Size : </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    8 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    9 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    10 UK
                  </span>
                </div>
                <button
                  type="button"
                  class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="rounded-md border">
              <img
                src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                alt="Laptop"
                class="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
              />
              <div class="p-4">
                <h1 class="inline-flex items-center text-lg font-semibold">
                  Nike Airmax v2
                </h1>
                <p class="mt-3 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi, debitis?
                </p>
                <div class="mt-4">
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Sneakers
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Nike
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Airmax
                  </span>
                </div>
                <div class="mt-3 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Colors : </span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"
                  ></span>
                </div>
                <div class="mt-5 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Size : </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    8 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    9 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    10 UK
                  </span>
                </div>
                <button
                  type="button"
                  class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="rounded-md border">
              <img
                src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                alt="Laptop"
                class="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
              />
              <div class="p-4">
                <h1 class="inline-flex items-center text-lg font-semibold">
                  Nike Airmax v2
                </h1>
                <p class="mt-3 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi, debitis?
                </p>
                <div class="mt-4">
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Sneakers
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Nike
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Airmax
                  </span>
                </div>
                <div class="mt-3 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Colors : </span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"
                  ></span>
                </div>
                <div class="mt-5 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Size : </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    8 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    9 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    10 UK
                  </span>
                </div>
                <button
                  type="button"
                  class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="rounded-md border">
              <img
                src="https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwxMTM4MTU1NXx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                alt="Laptop"
                class="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
              />
              <div class="p-4">
                <h1 class="inline-flex items-center text-lg font-semibold">
                  Nike Airmax v2
                </h1>
                <p class="mt-3 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Excepturi, debitis?
                </p>
                <div class="mt-4">
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Sneakers
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Nike
                  </span>
                  <span
                    class="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
                  >
                    #Airmax
                  </span>
                </div>
                <div class="mt-3 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Colors : </span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"
                  ></span>
                  <span
                    class="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"
                  ></span>
                </div>
                <div class="mt-5 flex items-center space-x-2">
                  <span class="block text-sm font-semibold">Size : </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    8 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    9 UK
                  </span>
                  <span
                    class="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium"
                  >
                    10 UK
                  </span>
                </div>
                <button
                  type="button"
                  class="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <a
              href="#"
              class="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900"
            >
              ← Previous
            </a>
            <a
              href="#"
              class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
            >
              1
            </a>
            <a
              href="#"
              class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
            >
              2
            </a>
            <a
              href="#"
              class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
            >
              3
            </a>
            <a
              href="#"
              class="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
            >
              4
            </a>
            <a href="#" class="mx-2 text-sm font-semibold text-gray-900">
              Next →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
