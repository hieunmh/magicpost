<template>
  <div class="w-[1100px] pt-4 flex flex-col items-center gap-8 h-[calc(100vh-140px)] pb-24 overflow-auto scrollbar-hide">
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

</script>