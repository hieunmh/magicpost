<template>
  <MainLayout>
    <div class="w-full flex items-center justify-center">
      <div class="w-[1100px] flex flex-col items-center h-[calc(100vh-64px)] pb-20 overflow-auto scrollbar-hide">
        <div v-if="!transactionStore.isLoading" class="w-full mt-4 px-4 md:px-10">
          <button @click="router.back()" class="w-full flex">
            <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
          </button>
          <p class="text-xl sm:text-2xl w-full text-center font-semibold text-gray-500">Trung tâm tập kết {{ name }}</p>
          <div class="w-full font-semibold text-gray-500 text-center h-8 flex items-center justify-center">
            <p>Địa chỉ: {{ agg?.address }}</p>
          </div>
          
          <div class="w-full flex flex-col items-center">
            <div class="flex flex-col items-center justify-center w-[400px] relative">
              <div class="flex font-semibold text-gray-500 items-center h-8 justify-center">
                <p class="mr-2">Trưởng điểm:</p>
                <p>{{ aggHead?.users.email }} 
                  <button class=" hover:underline text-[#189ab4] ml-1" @click="ceoStore.showUpdate = true">Sửa</button>
                </p>
              </div>

              <div class="flex font-semibold text-gray-500 h-8 items-center justify-center">
                <p class="mr-2">SĐT:</p>
                <p>
                  0{{ aggHead?.users.phone?.substring(2, 4) }} 
                  {{ aggHead?.users.phone?.substring(4, 7) }}
                  {{ aggHead?.users.phone?.substring(7, 9) }}
                  {{ aggHead?.users.phone?.substring(9, 11) }}
                </p>
              </div>

              <CeoUpdateAggHead />
            </div>

            <div class="w-full flex items-center justify-center pb-4">
              <div class="w-[1100px] flex items-center justify-center font-semibold text-gray-500 px-4 md:px-10">
                <div class="w-full rounded-xl">
                  <div class="flex items-center justify-center h-10">
                    <Icon name="ic:round-log-in" class="text-[20px] mr-1" />
                    <div class="flex items-center">
                      <p class="w-[100px]">Hàng nhận:</p>
                      <Vue3autocounter v-if="true" 
                        :ref="aggregationStore.receivePackage" :startAmount="1000" 
                        :endAmount="aggregationStore.receivePackage" :duration="1.5" 
                      />
                      <p v-else>{{ aggregationStore.receivePackage }}</p>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        
        <div class="w-full px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center justify-center">
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
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>

import MainLayout from '~/layouts/MainLayout.vue';
import { useTransactionStore } from '~/store/transaction';
import { useAggregationStore } from '~/store/aggregation';
import { useCeoStore } from '~/store/ceo';

import Vue3autocounter from 'vue3-autocounter';

const aggregationStore = useAggregationStore();
const transactionStore = useTransactionStore();
const ceoStore = useCeoStore();

const route = useRoute();
const router = useRouter();

const filterTransactionPoint = computed(() => {
  return transactionStore.allTransactionPoint?.filter(tran => {
    return tran.aggregation_id == aggregationStore.id;
  })
});

const aggHead = computed(() => {
  return aggregationStore.allAggHead?.find(aggHead => {
    return aggHead.aggregation_point_id == aggregationStore.id;
  })
})

const name = computed(() => {
  if (route.params.id == 'mienbac') return 'Miền Bắc';
  if (route.params.id == 'mientrung') return 'Miền Trung';
  if (route.params.id == 'miennam') return 'Miền Nam';
  if (route.params.id == 'mientay') return 'Miền Tây';
})

const agg = computed(() => {
  return aggregationStore.allAggregationPoint?.find(agg => {
    return agg.id == aggregationStore.id;
  })
})

computed(() => {
  if (route.params.id == 'mienbac') aggregationStore.id = '9db383cd-732d-4af0-ac4c-9dc0f4457721';
  if (route.params.id == 'mientrung') aggregationStore.id = 'b4beb09a-573e-447b-85cf-ce71179c5e08';
  if (route.params.id == 'miennam') aggregationStore.id = '2cdfc55a-8e69-4165-8deb-aebca75277f3';
  if (route.params.id == 'mientay') aggregationStore.id = '5d536975-c696-47b4-b489-1c8d83d05579';
})

onMounted( async () => {
  const aggPoint = aggregationStore.allAggregationPoint?.find(agg => {
    return agg.id == aggregationStore.id;
  })

  const data = await useFetch('/api/auth/Ceo/getAllNewAndSentPackagesIn1Location', {
    method: 'post',
    body: {
      address: aggPoint?.address
    }
  })

  aggregationStore.receivePackage = data.data.value?.length ;
})

</script>