<template>
  <div class="w-[1100px] flex flex-col items-center gap-8 h-[calc(100vh-200px)] overflow-auto scrollbar-hide">
    <div class="w-full mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center">
      <NuxtLink class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-sm font-semibold cursor-pointer"
        v-for="aggregation in aggregationStore.allAggregationPoint" :key="aggregation.id" :to="'/profile/ceo/' + aggregation.id"
      >
        <div class="grid grid-cols-12 h-10 items-center text-center">
          <div class="col-span-4">ID:</div>
          <div class="col-span-8">{{ aggregation.id }}</div>
        </div>
        
        <div class="grid grid-cols-12 h-10 items-center text-center">
          <div class="col-span-4">Name:</div>
          <div class="col-span-8">{{ aggregation.name }}</div>
        </div>

        <div class="grid grid-cols-12 h-10 items-center text-center">
          <div class="col-span-4">Address:</div>
          <div class="col-span-8">{{ aggregation.address }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();

</script>