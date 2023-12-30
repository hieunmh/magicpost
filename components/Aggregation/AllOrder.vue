<template>
  <div class="w-full h-full mt-6 relative">
    <div class="w-full flex items-center justify-center">
      <div class="w-full px-2 sm:px-16 md:px-0">
        <div class="flex justify-between md:text-lg sm:text-sm text-xs">
          <button class="w-1/2" @click="clientStore.aggEmployeeTab = '1'"
            :class="clientStore.aggEmployeeTab == '1' ? 'text-[#189ab4]' : 'text-gray-500'"
          >
            <h1 class="font-semibold mb-4 text-center">Đơn hàng chuyển đến</h1>
          </button>

          <button class="w-1/2" @click="clientStore.aggEmployeeTab = '2'"
            :class=" clientStore.aggEmployeeTab == '2' ? 'text-[#189ab4]' : 'text-gray-500'"
          >
            <h1 class="font-semibold mb-4 text-center">Đơn hàng chuyển đi</h1>
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
      <div class="w-[1100px] h-fit rounded-xl p-4">
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center">
          <div class="flex flex-col p-2 sm:p-6 rounded-lg shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
            v-for="p in aggregationStore.allNewPackage"
          >
            <div class="flex flex-col">
              <div class="flex items-center h-8">
                <Icon name="material-symbols-light:barcode" class="text-[25px] mr-2" />
                <p class="text-sm">{{ p.id }}</p>
              </div>

              <div class="flex items-center h-8">
                <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
                <p class="text-sm">ĐC gửi: {{ p.packageDetails.sender_address }}</p>
              </div>

              <div class="flex items-center h-8">
                <Icon name="material-symbols:person" class="text-[25px] mr-1" />
                <p class="text-sm">Người gửi: {{ p.packageDetails.sender_name }}</p>
              </div>

              <div class="flex items-center h-8">
                <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
                <p class="text-sm">ĐC nhận: {{ p.packageDetails.receiver_address }}</p>
              </div>

              <div class="flex items-center h-8">
                <Icon name="material-symbols:person" class="text-[25px] mr-1" />
                <p class="text-sm">Người nhận: {{ p.packageDetails.receiver_name }}</p>
              </div>

              <div class="text-base mt-2 h-10">
                <button class="bg-[#189ab4] text-sm w-full rounded-lg outline-none px-4 py-2 text-white font-semibold"
                  @click="pkInfo = p;aggregationStore.showNextLocation = true;"
                >
                  Chọn địa điểm chuyển tiếp
                </button>
              </div>
            </div>
          </div>

          <AggregationLocation :pkInfo="pkInfo" />
        </div>
      </div>
    </div>


    <div class="w-full mt-6 px-4 md:px-10 flex items-center justify-center absolute"
      :class="[
        { 'left-[100vw] transition-all duration-300': clientStore.aggEmployeeTab == '1' },
        { '-left-0 transition-all duration-300': clientStore.aggEmployeeTab == '2' },
      ]"
    >
    <div class="w-[1100px] h-fit rounded-xl p-4">
      <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center">
        <div class="flex flex-col p-2 sm:p-6 rounded-lg shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
          v-for="p in aggregationStore.allSentPackage"
        >
          <div class="flex flex-col">
            <div class="flex items-center h-8">
              <Icon name="material-symbols-light:barcode" class="text-[25px] mr-2" />
              <p class="text-sm">{{ p.id }}</p>
            </div>

            <div class="flex items-center h-8">
              <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
              <p class="text-sm">ĐC gửi: {{ p.packageDetails.sender_address }}</p>
            </div>

            <div class="flex items-center h-8">
              <Icon name="material-symbols:person" class="text-[25px] mr-1" />
              <p class="text-sm">Người gửi: {{ p.packageDetails.sender_name }}</p>
            </div>

            <div class="flex items-center h-8">
              <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
              <p class="text-sm">ĐC nhận: {{ p.packageDetails.receiver_address }}</p>
            </div>

            <div class="flex items-center h-8">
              <Icon name="material-symbols:person" class="text-[25px] mr-1" />
              <p class="text-sm">Người nhận: {{ p.packageDetails.receiver_name }}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();

import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

import { useAggregationStore } from "~/store/aggregation";
import { useTransactionStore } from "~/store/transaction";
import { PackageType } from "~/types/packageType";
import { PackageDetailType } from "~/types/packageDetailType";
import { PackageStatusType } from "~/types/packageStatusType";

let pkInfo = ref<(PackageType & { packageStatus: PackageStatusType[], packageDetails: PackageDetailType })>();


const aggregationStore = useAggregationStore();

onMounted(() => {
  clientStore.aggEmployeeTab = "1";
});

client.channel('get sent package').on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'packageStatus',
    filter: ``,
  }, 
    async (payload) => {

    }

).subscribe()



</script>
