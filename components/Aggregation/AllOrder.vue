<template>
  <div class="w-full h-full mt-6 relative">
    <div class="w-full flex items-center justify-center">
      <div class="sm:w-[800px] w-full px-2 sm:px-16 md:px-0">
        <div class="flex justify-between md:text-lg sm:text-sm text-xs">
          <button class="w-1/2" @click="clientStore.aggEmployeeTab = '1'"
            :class="clientStore.aggEmployeeTab == '1' ? 'text-[#189ab4]' : 'text-gray-500'"
          >
            <h1 class="font-semibold mb-4 text-center">
              Đơn hàng yêu cầu
            </h1>
          </button>

          <button class="w-1/2" @click="clientStore.aggEmployeeTab = '2'"
            :class=" clientStore.aggEmployeeTab == '2' ? 'text-[#189ab4]' : 'text-gray-500'"
          >
            <h1 class="font-semibold mb-4 text-center">Đơn hàng đang chuyển</h1>
          </button>
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div class="absolute h-[6px] w-1/2 rounded-full px-12"
            :class="[
              { 'left-[0] transition-all duration-300': clientStore.aggEmployeeTab == '1' },
              { 'left-[calc(100%/2)] transition-all duration-300': clientStore.aggEmployeeTab == '2' },
            ]"
          >
            <div class="h-full w-full bg-[#189ab4] rounded-full" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-6 px-4 md:px-10 flex items-center justify-center absolute"
      :class="[
        { 'left-0 transition-all duration-300': clientStore.aggEmployeeTab == '1' },
        { '-left-[100vw] transition-all duration-300': clientStore.aggEmployeeTab == '2' },
      ]"
    >
      <div class="w-[1100px] h-[100px] bg-red-200 rounded-lg">

      </div>
    </div>


    <div class="w-full mt-6 px-4 md:px-10 flex items-center justify-center absolute"
      :class="[
        { 'left-[100vw] transition-all duration-300': clientStore.aggEmployeeTab == '1' },
        { '-left-0 transition-all duration-300': clientStore.aggEmployeeTab == '2' },
      ]"
    >
      <div class="w-[1100px] h-[100px] bg-blue-200 rounded-lg">

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

onMounted(() => {
  clientStore.aggEmployeeTab = "1";
});
</script>
