<template>
  <MainLayout>
    <div class="w-full flex items-center justify-center">
      <div class="w-[1100px] flex flex-col items-center gap-8 h-[calc(100vh-100px)] overflow-auto scrollbar-hide">
        <div v-if="!transactionStore.isLoading" class="w-full mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center">
          <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:sm font-semibold"
            v-for="tran in filterTransactionPoint" :key="tran.id"
          >
            <div class="grid grid-cols-12 h-12 items-center text-center">
              <div class="col-span-4">ID:</div>
              <div class="col-span-8">{{ tran.id }}...</div>
            </div>
            
            <div class="grid grid-cols-12 h-12 items-center text-center">
              <div class="col-span-4">Name:</div>
              <div class="col-span-8">{{ tran.name }}</div>
            </div>

            <div class="grid grid-cols-12 h-12 items-center text-center">
              <div class="col-span-4">Address:</div>
              <div class="col-span-8">{{ tran.address }}</div>
            </div>
          </div>
        </div>

        <div v-else class="w-full mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center animate-pulse">
          <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:sm font-semibold">
            <div class="grid grid-cols-12 h-12 items-center text-center bg-gray-200 rounded-lg"></div>
            
            <div class="grid grid-cols-12 h-12 items-center text-center bg-gray-200 rounded-lg"></div>

            <div class="grid grid-cols-12 h-12 items-center text-center bg-gray-200 rounded-lg"></div>
          </div>

          <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:sm font-semibold">
            <div class="grid grid-cols-12 h-12 items-center text-center bg-gray-200 rounded-lg"></div>
            
            <div class="grid grid-cols-12 h-12 items-center text-center bg-gray-200 rounded-lg"></div>

            <div class="grid grid-cols-12 h-12 items-center text-center bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>

import MainLayout from '~/layouts/MainLayout.vue';
import { useTransactionStore } from '~/store/transaction';

const transactionStore = useTransactionStore();

const route = useRoute();

const filterTransactionPoint = computed(() => {
  return transactionStore.allTransactionPoint?.filter(tran => {
    return tran.aggregation_id == route.params.id;
  })
})

// onMounted( async () => {
//   if (transactionStore.allTransactionPoint?.length == 0) {

//   }
// })

</script>