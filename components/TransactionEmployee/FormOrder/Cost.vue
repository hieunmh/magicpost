<template>
  <div class="w-[80%] p-2 sm:p-6 rounded-xl shadow-lg border-[1px] mb-7">
    <div class="mb-7 w-full text-lef font-semibold">Phí vận chuyển</div>
    <div class="w-full flex mb-7">
      <div class="w-[50%]">
        <div class="font-semibold text-gray-500">Dịch vụ:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng chọn"
        />
      </div>
    </div>

    <div class="mb-7 bg-gray-300">
      <div class="ml-2">Chi tiết giá</div>
    </div>

    <div>Phí vận chuyển(VND):</div>
    <div>Phí thu hộ(COD):</div>
    <div>Tổng giá trị:</div>
  </div>
</template>
<script lang="ts" setup>
let textInput = ref<string>("");
let textError = ref<string>("");
</script>
