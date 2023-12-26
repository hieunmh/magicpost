<template>
  <div class=" flex flex-col px-4 sm:px-10 mt-6 w-full left-0 transition-all duration-300 items-center justify-center">
    <div class="w-[1100px] rounded-xl shadow-lg mb-6 border-[1px] p-6">
      <div class="flex flex-col md:flex-row w-full md:space-x-10 mb-6">
        <div class="w-[50%]">
          <div class="mb-6 w-full text-left text-lg text-[#189ab4] font-semibold">1. Thông tin người gửi</div>
          <div class="w-full md:flex flex-col mb-4 h-20">Họ và tên:</div>
          <div class="w-full md:flex flex-col mb-4 h-20">Địa chỉ:</div>
          <div class="w-full md:flex flex-col mb-4 h-20">Số điện thoại:</div>
        </div>
        <div class="w-[50%]">
          <div class="mb-6 w-full text-left text-lg text-[#189ab4] font-semibold">2. Thông tin người nhận</div>
          <div class="w-full md:flex flex-col mb-4 h-20">Họ và tên:</div>
          <div class="w-full md:flex flex-col mb-4 h-20">Địa chỉ:</div>
          <div class="w-full md:flex flex-col mb-4 h-20">Số điện thoại:</div>
        </div>
      </div>
      <div>
        <div> Lựa chọn điểm tập kết </div>
        <div class="mt-2">
          <AllAggregtion />
          <input type="text" class="bg-gray-100 w-full h-8 outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold text-gray-500"
          placeholder="Vui lòng chọn"
          @focus="clientStore.showAggLocation = true"
          :value="agg"
          />
        </div>
      </div>
      <button class="bg-[#189ab4] h-10 w-full md:w-fit px-6 rounded-lg text-white text-sm sm:text-xl font-semibold mt-6 mb-10">
        Xác nhận
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useClientStore } from '~/store/client';

const clientStore = useClientStore();

let agg = computed(() => {
  return clientStore.sendProvince && !clientStore.showAggLocation
  ? clientStore.sendProvince : '';
})

</script>
