<template>
  <div class="w-full h-full mt-6">
    <div class="w-full flex items-center justify-center">
      <div class="sm:w-[80%] w-[400px] px-2 sm:px-16 md:px-0">
        <div class="flex justify-between md:text-lg sm:text-sm text-xs">
          <button
            class="w-1/2"
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
            class="w-1/2"
            @click="clientStore.ordernavigatorTab = 'sendOrder'"
            :class="
              clientStore.ordernavigatorTab == 'sendOrder'
                ? 'text-[#189ab4]'
                : 'text-gray-500'
            "
          >
            <h1 class="font-semibold mb-4 text-center">Đơn hàng đã chuyển</h1>
          </button>
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div
            class="absolute h-[6px] w-1/2 rounded-full px-4 sm:px-10"
            :class="[
              {
                'left-[0px] transition-all duration-300':
                  clientStore.ordernavigatorTab == 'newOrder',
              },
              {
                'left-[calc(100%/2)] transition-all duration-300':
                  clientStore.ordernavigatorTab == 'sendOrder',
              },
            ]"
          >
            <div class="h-full w-full bg-[#189ab4] rounded-full" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center absolute"
      :class="[
        {
          'left-0 transition-all duration-300':
            clientStore.ordernavigatorTab == 'newOrder',
        },
        {
          '-left-[500vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'sendOrder',
        },
      ]"
    >
      <OrderNewOrder />
    </div>

    <div
      class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center absolute"
      :class="[
        {
          '-right-[500vw] transition-all duration-300':
            clientStore.ordernavigatorTab == 'newOrder',
        },
        {
          'right-0 transition-all duration-300':
            clientStore.ordernavigatorTab == 'sendOrder',
        },
      ]"
    >
      <OrderSendOrder />
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
