<template>
  <div class="w-[1100px] pt-4 flex flex-col items-center h-[calc(100vh-100px)] pb-20 overflow-auto scrollbar-hide">
    <div class="w-full flex items-center justify-center pb-4 sm:pb-6 md:pb-8">
      <div class="w-[1100px] flex items-center justify-center font-semibold text-gray-500 px-4 md:px-10">
        <div class="w-full shadow-lg border-[1px] rounded-xl p-2 md:p-6">
          <p class="text-2xl text-center">Thống kê</p>
          <div class="flex items-center justify-center h-10">
            <Icon name="ic:round-log-out" class="text-[20px] mr-1" />
            <div class="flex items-center">
              <p class="w-[100px]">Hàng gửi:</p>
              <Vue3autocounter v-if="ceoStore.show" 
                :ref="ceoStore.sendPackage" :startAmount="1000" 
                :endAmount="ceoStore.sendPackage" :duration="1" 
              />
              <p v-else>{{ ceoStore.sendPackage }}</p>
            </div>
          </div>

          <div class="flex items-center justify-center h-10">
            <Icon name="ic:round-log-in" class="text-[20px] mr-1" />
            <div class="flex items-center">
              <p class="w-[100px]">Hàng nhận:</p>
              <Vue3autocounter v-if="ceoStore.show" 
                :ref="ceoStore.receivePackage" :startAmount="1000" 
                :endAmount="ceoStore.receivePackage" :duration="1" 
              />
              <p v-else>{{ ceoStore.receivePackage }}</p>
            </div>
          </div>
        </div>
      </div>  
    </div>

    <div v-if="!aggregationStore.isLoading" 
      class="w-full px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center"
    > 
      <NuxtLink class="flex flex-col space-y-4 p-2 md:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-sm font-semibold cursor-pointer"
        v-for="aggregation in aggregationStore.allAggregationPoint" :key="aggregation.id" :to="'/profile/ceo/' + aggregation.notes"
        @click="aggregationStore.id = aggregation.id"
      >
        <div class="flex h-8 items-center">
          <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
          <div class="text-lg">{{ aggregation.name }}</div>
        </div>
        
        <div class="flex h-8 items-center text-justify">
          <Icon name="material-symbols:my-location-rounded" class="text-[20px] mr-2" />
          <div class="">{{ aggregation.address }}</div>
        </div>

        <div class="flex h-8 items-center text-justify">
          <Icon name="material-symbols:call-sharp" class="text-[20px] mr-2" />
          <div class="">{{ aggregation.phone }}</div>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="w-full mt-6 px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center animate-pulse">
      <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-sm font-semibold cursor-pointer">
        <div class="h-8 bg-gray-200 rounded-lg">
          
        </div>
        
        <div class="h-8 bg-gray-200 rounded-lg">
          
        </div>

        <div class="h-8 bg-gray-200 rounded-lg">
          
        </div>
      </div>

      <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-sm font-semibold cursor-pointer">
        <div class="h-8 bg-gray-200 rounded-lg">
          
        </div>
        
        <div class="h-8 bg-gray-200 rounded-lg">
          
        </div>

        <div class="h-8 bg-gray-200 rounded-lg">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();

import { useCeoStore } from '~/store/ceo';
const ceoStore = useCeoStore();

import Vue3autocounter from 'vue3-autocounter';

import { PackageType } from '~/types/packageType';
import { PackageStatusType } from '~/types/packageStatusType';


const allPackage = ref<(PackageType & { Sent: number, packageStatus: PackageStatusType[] })[]>();

onMounted( async () => {
  if (ceoStore.loading) {
    const data = await useFetch('/api/auth/Ceo/getAllNewAndFinishedPackages');

    allPackage.value = data.data.value;

    ceoStore.sendPackage = allPackage.value?.filter(pk => {
      return pk.Sent == 1;
    }).length;

    ceoStore.receivePackage =  allPackage.value?.filter(pk => {
      return pk.Sent == 0;
    }).length;
    

    ceoStore.loading = false;
    ceoStore.show = false;
  }
})



</script>