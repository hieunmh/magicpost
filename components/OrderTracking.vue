<template>
  <div class="mt-6">
    <div class="flex justify-evenly px-10">
      <h1 class="font-semibold text-4xl text-gray-500 mb-4 text-center">Theo dõi đơn hàng</h1>
      <h1 class="font-semibold text-4xl text-gray-500 mb-4 text-center">Ước tính chi phí</h1>
    </div>

    <div class="w-full mt-6 px-4 sm:px-10">
      <div class="w-full flex h-14 sm:h-32 p-2  sm:p-6 rounded-xl shadow-lg border-[1px]">
        <input type="text"  class="bg-gray-100 w-full outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold"
          placeholder="Nhập mã đơn hàng"
        >
        <button class="bg-[#189ab4] w-28 sm:w-36 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold">
          Theo dõi
        </button>
      </div>
    </div>

    <div class="w-full mt-6 px-4 sm:px-10">
      <div class="w-full flex h-14 sm:h-32 p-2  sm:p-6 rounded-xl shadow-lg border-[1px]">
        <input type="text"  class="bg-gray-100 w-full outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold"
          placeholder="Ước tính chi phí"
        >
        <button class="bg-[#189ab4] w-28 sm:w-36 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold">
          Uớc tính
        </button>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>

</script>