<template>
  <MainLayout>
    <div class="w-full flex items-center justify-center">
      <div class="w-[1100px] text-center mt-4">
        <p class="font-semibold text-gray-500 text-lg">{{ transaction?.name }}</p>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout  from '~/layouts/MainLayout.vue';
import { useTransactionStore } from '~/store/transaction';
const transactionStore = useTransactionStore();

const route = useRoute();


const transaction =  computed(() => {
  return transactionStore.allTransactionPoint?.find(tran => {
    return tran.code == route.params.id;
  }) 
})
</script>
