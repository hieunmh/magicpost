<template>
  <MainLayout>
    <div class="w-full flex items-center justify-center">
      <div class="w-[1100px] flex flex-col items-center h-[calc(100vh-64px)] pb-20 overflow-auto scrollbar-hide">
        <div v-if="!transactionStore.isLoading" class="w-full mt-4 px-4 md:px-10">
          <button @click="router.back()" class="w-full flex">
            <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
          </button>
          <p class="text-xl sm:text-2xl w-full text-center font-semibold text-gray-500">Trung tâm tập kết {{ name }}</p>
          <div class="w-full flex flex-col items-center">
            <div class="flex font-semibold text-gray-500">
              <p class="mr-2">Trưởng điểm tập kết:</p>
              <p>{{ aggHead?.users.email }}</p>
            </div>

            <div class="flex font-semibold text-gray-500">
              <p class="mr-2">Số điện thoại:</p>
              <p>
                0{{ aggHead?.users.phone?.substring(2, 4) }} 
                {{ aggHead?.users.phone?.substring(4, 7) }}
                {{ aggHead?.users.phone?.substring(7, 9) }}
                {{ aggHead?.users.phone?.substring(9, 11) }}
              </p>
            </div>
          </div>
        </div>

        <div v-else>

        </div>
        
        <div v-if="!transactionStore.isLoading" 
          class="w-full mt-6 px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center"
        >
          <NuxtLink class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:sm font-semibold"
            v-for="tran in filterTransactionPoint" :key="tran.id" :to="'/profile/ceo/' + route.params.id + '/' + tran.code"
          > 
            <div class="flex h-8 items-center text-center">
              <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
              <div class="text-lg">{{ tran.name }}</div>
            </div>

            <div class="flex h-8 items-center text-center">
              <Icon name="material-symbols:my-location-rounded" class="text-[20px] mr-2" />
              <div class="">{{ tran.address }}</div>
            </div>

            <div class="flex h-8 items-center text-center">
              <Icon name="material-symbols-light:barcode" class="text-[20px] mr-2" />
              <div class="">{{ tran.code }}</div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="w-full mt-6 px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center animate-pulse">
          <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:sm font-semibold">
            <div class="h-8 bg-gray-200 rounded-lg"></div>
            
            <div class="h-8 bg-gray-200 rounded-lg"></div>

            <div class="h-8 bg-gray-200 rounded-lg"></div>
          </div>

          <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:sm font-semibold">
            <div class="h-8 bg-gray-200 rounded-lg"></div>
            
            <div class="h-8 bg-gray-200 rounded-lg"></div>

            <div class="h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>

import MainLayout from '~/layouts/MainLayout.vue';
import { useTransactionStore } from '~/store/transaction';
import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();
const transactionStore = useTransactionStore();

const route = useRoute();
const router = useRouter();


// const filterTransactionPoint = computed(() => {
//   return transactionStore.allTransactionPoint?.filter(tran => {
//     return tran.aggregation_id == aggregationStore.id;
//   })
// });

const filterTransactionPoint = transactionStore.allTransactionPoint?.filter(tran => {
  return tran.aggregation_id == aggregationStore.id;
})

// const aggHead = computed(() => {
//   return aggregationStore.allAggHead?.find(aggHead => {
//     return aggHead.aggregation_point_id == aggregationStore.id;
//   })
// })

const aggHead = aggregationStore.allAggHead?.find(aggHead => {
  return aggHead.aggregation_point_id == aggregationStore.id;
})

const name = computed(() => {
  if (route.params.id == 'mienbac') return 'Miền Bắc';
  if (route.params.id == 'mientrung') return 'Miền Trung';
  if (route.params.id == 'miennam') return 'Miền Nam';
  if (route.params.id == 'mientay') return 'Miền Tây';
})


</script>