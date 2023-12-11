<template>
  <MainLayout>
    <div class="w-full h-full flex items-center justify-center">
      <div class="w-[1100px] mt-6 px-4 sm:px-10 grid grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center">
        <div class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
          v-for="agg in userStore.allAggregationHead" 
        >
          <div class="grid grid-cols-12 h-8 items-center text-center">
            <div class="col-span-4">ID:</div>
            <div class="col-span-8">{{ agg.id.substring(0, 15) }}...</div>
          </div>
          
          <!-- <div class="grid grid-cols-12 h-8 items-center text-center">
            <div class="col-span-4">Email:</div>
            <div class="col-span-8">{{ agg.email?.substring(0, 10) }}...</div>
          </div> -->

          <div class="grid grid-cols-12 h-8 items-center text-center">
            <div class="col-span-4">Phone:</div>
            <div class="col-span-8">0{{ agg.phone?.substring(2) }}</div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/store/user';
import { UserType } from '~/types/userType';
const userStore = useUserStore();

definePageMeta({middleware: ['profile']});

</script>