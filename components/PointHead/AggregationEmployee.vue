<template>
  <div class="w-full h-full">
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
              Tạo tài khoản
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
            <h1 class="font-semibold mb-4 text-center">Quản lý nhân viên</h1>
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
      class="mt-2 w-full px-4 sm:px-10 flex items-center justify-center absolute"
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
      <div class="w-[500px] items-center justify-center scrollbar-hide border-[1px]">
        <div class="flex flex-col overflow-y-auto overflow-x-hidden h-[calc(100vh-160px)]w-full rounded-xl shadow-lg mb-6  p-6">
          <PointHeadNewUser />
        </div>
      </div>
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
      <div class="md:w-[1100px] w-full flex p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
        <div
          class="w-full mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center"
        >
          <NuxtLink class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
            v-for="head in userStore.allEmployee" :key="head.id" :to="'/profile/user/' + head.id"
          >
            <div class="flex h-8 items-center">
              <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
              <div class="text-lg">{{ head.id.substring(0, 15) }}...</div>
            </div>
            <div class="grid grid-cols-12 h-8 items-center text-center">
              <Icon name="material-symbols:my-location-rounded" class="text-[20px] mr-2" />
              <div class="col-span-8">{{ head.address }}</div>
            </div>
  
            <div class="grid grid-cols-12 h-8 items-center text-center">
              <Icon name="material-symbols:call-sharp" class="text-[20px] mr-2" />
              <div class="text-lg">0{{ head.phone?.substring(2) }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
import { useUserStore } from "~/store/user";
const clientStore = useClientStore();
const userStore = useUserStore();


onMounted(() => {
  clientStore.ordernavigatorTab = "newOrder";
});

</script>
