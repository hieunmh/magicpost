<template>
  <div class="w-full h-full fixed px-4 sm:px-0 top-0 left-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    :class="aggregationStore.showNextLocation ? 'visible opacity-100 transition-all duration-300 ease-in' 
    : 'invisible opacity-0 transition-all duration-300 ease-in'"
    @click.self="aggregationStore.showNextLocation = false"
  >
    <div class="w-[500px] h-[396px] px-4 bg-white rounded-lg shadow-xl z-40 border-[1px]"> 
      <div class="border-[1.5px] rounded-lg mt-[18px]">
        <div class="w-full h-[360px] overflow-y-scroll text-sm scrollbar-hide">
          <option value=""
          class="cursor-pointer h-10 font-bold text-gray-700 hover:bg-gray-100 flex items-center pl-6"
          >
            Điểm tập kết
          </option>

          <option value="" v-for="agg in aggregationStore.allAggregationPoint"
            @click="aggregationStore.nextLocation = agg.address; aggregationStore.showNextLocation = false"
            class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            :class="agg.id == aggregationStore.aggregationId ? 'hidden': 'block'"
          >
            <p>{{ agg.address }}</p>
          </option>

          <option value=""
          class="cursor-pointer h-10 font-bold text-gray-700 hover:bg-gray-100 ] flex items-center pl-6"
          >
            Điểm giao dịch
          </option>

          <option value="" v-for="tran in filtertranSaction"
            @click="aggregationStore.nextLocation = tran.address; aggregationStore.showNextLocation = false"
            class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
          >
            {{ tran.address }}
          </option>
          
        </div>        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();

import { useTransactionStore } from '~/store/transaction';
const transactionStore = useTransactionStore();

const filtertranSaction = computed(() => {
  return transactionStore.allTransactionPoint?.filter(tran => {
    return tran.aggregation_id == aggregationStore.aggregationId;
  })
})



</script>