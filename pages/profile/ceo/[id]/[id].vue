<template>
  <MainLayout>
    <div class="w-full flex items-center justify-center">
      <div class="w-[1100px] text-center mt-4 font-semibold text-gray-500 px-4 md:px-10">
        <button @click="router.back()" class="w-full flex">
            <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
          </button>
        <p class="text-xl sm:text-2xl w-full text-center">{{ transaction?.name }}</p>
        <div class="h-8 flex items-center justify-center">
          <p>Địa chỉ: {{ transaction?.address }}</p>
        </div>
        <div class="h-8 flex items-center justify-center">
          <p>Mã bưu điện: {{ transaction?.code }}</p>
        </div>
        <div class="w-full flex flex-col items-center">
          <div class="flex font-semibold items-center justify-center h-8">
            <p class="mr-2">Trưởng điểm:</p>
            <p>{{  transactionHead?.users.email  }}
              <button class=" hover:underline text-[#189ab4] ml-1" @click="ceoStore.showUpdateTran = true">Sửa</button>
            </p>
          </div>

          <div class="flex font-semibold text-gray-500 items-center justify-center h-8">
            <p class="mr-2">SĐT:</p>
            <p>
              0{{ transactionHead?.users.phone?.substring(2, 4) }} 
              {{ transactionHead?.users.phone?.substring(4, 7) }}
              {{ transactionHead?.users.phone?.substring(7, 9) }}
              {{ transactionHead?.users.phone?.substring(9, 11) }}
            </p>
          </div>

          <CeoUpdateTranHead />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout  from '~/layouts/MainLayout.vue';
import { useTransactionStore } from '~/store/transaction';
const transactionStore = useTransactionStore();

import { useCeoStore } from '~/store/ceo';
const ceoStore = useCeoStore(); 

const route = useRoute();
const router = useRouter();

const transaction = computed(() => {
  return transactionStore.allTransactionPoint?.find(tran => {
    return tran.code == route.params.id;
  }) 
})

const transactionHead = computed(() => {
  return transactionStore.allTransactionHead?.find(tran => {
    return tran.transaction_point_id == transaction.value?.id;
  })
})

</script>
