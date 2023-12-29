<template>
  <div class="w-full h-full mt-6">
    <div class="w-full flex items-center justify-center">
      <div class="sm:w-[80%] w-[400px] px-2 sm:px-16 md:px-0">
        <div class="flex justify-between md:text-lg sm:text-sm text-xs">
          <button
            class="w-1/3"
            @click="clientStore.ordernavigatorTab = 'newOrder'"
          >
            <h1
              class="font-semibold mb-4 text-center"
              :class="
                clientStore.ordernavigatorTab == 'newOrder'
                  ? 'text-[#189ab4]'
                  : 'text-gray-500'
              "
            >
              Đơn hàng yêu cầu
            </h1>
          </button>

          <button
            class="w-1/3"
            @click="clientStore.ordernavigatorTab = 'sendOrder'"
            :class="
              clientStore.ordernavigatorTab == 'sendOrder'
                ? 'text-[#189ab4]'
                : 'text-gray-500'
            "
          >
            <h1 class="font-semibold mb-4 text-center">Đơn hàng đã chuyển</h1>
          </button>

          <button
            class="w-1/3"
            @click="clientStore.ordernavigatorTab = 'cancelOrder'"
            :class="
              clientStore.ordernavigatorTab == 'cancelOrder'
                ? 'text-[#189ab4]'
                : 'text-gray-500'
            "
          >
            <h1 class="font-semibold mb-4 text-center">Đơn hàng bị hủy</h1>
          </button>
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div
            class="absolute h-[6px] w-1/3 rounded-full px-4 sm:px-10"
            :class="[
              {
                'left-[0px] transition-all duration-300':
                  clientStore.ordernavigatorTab == 'newOrder',
              },
              {
                'left-[calc(100%/3)] transition-all duration-300':
                  clientStore.ordernavigatorTab == 'sendOrder',
              },
              {
                'left-[calc(200%/3)] transition-all duration-300':
                  clientStore.ordernavigatorTab == 'cancelOrder',
              },
            ]"
          >
            <div class="h-full w-full bg-[#189ab4] rounded-full" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full mt-6 px-4 md:px-10 flex items-center justify-center absolute"
      :class="[
        {
          'left-0 transition-all duration-300':
            clientStore.ordernavigatorTab == 'newOrder',
        },
        {
          '-left-[200vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'sendOrder',
        },
        {
          '-left-[200vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'cancelOrder',
        },
      ]"
    >
      <OrderNewOrder />
    </div>


    <div
      class="w-full mt-6 px-4 md:px-10 flex items-center justify-center absolute"
      :class="[
        {
          'left-[200vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'newOrder',
        },
        {
          '-left-0 transition-all duration-300':
            clientStore.ordernavigatorTab == 'sendOrder',
        },
        {
          '-left-[200vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'cancelOrder',
        },
      ]"
    >
      <OrderSendOrder />
    </div>

    <div
      class="w-full mt-6 px-4 md:px-10 flex items-center justify-center absolute"
      :class="[
        {
          '-right-[200vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'newOrder',
        },
        {
          '-right-[200vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'sendOrder',
        },
        {
          'right-0 transition-all duration-300':
            clientStore.ordernavigatorTab == 'cancelOrder',
        },
      ]"
    >
      <OrderCancelOrder />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

onMounted(() => {
  clientStore.ordernavigatorTab = "newOrder";
});
</script>
