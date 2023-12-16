<template>
  <div class="w-[1100px] grid grid-cols-1 sm:grid-cols-2 gap-8 h-[calc(100vh-250px)] overflow-auto scrollbar-hide">
    <div class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
      v-for="head in userStore.allHead" @click="showHeadDetail(head)"
    >
      <div class="grid grid-cols-12 h-16 items-center text-center">
        <div class="col-span-4">ID:</div>
        <div class="col-span-8">{{ head.id.substring(0, 15) }}...</div>
      </div>
      
      <div class="grid grid-cols-12 h-16 items-center text-center">
        <div class="col-span-4">Role:</div>
        <div class="col-span-8">{{ head.role }}</div>
      </div>

      <div class="grid grid-cols-12 h-16 items-center text-center">
        <div class="col-span-4">Phone:</div>
        <div class="col-span-8">0{{ head.phone?.substring(2) }}</div>
      </div>

      <div class="grid grid-cols-12 h-16 items-center text-center">
        <div class="col-span-4">Address:</div>
        <div class="col-span-8">{{ head.address }}</div>
      </div>
    </div>
  </div>

  <CeoHeadDetail :headDetail="headDetail" class="fixed"
    :class="[
      { 'visible transition-all duration-500 bg-black bg-opacity-50 opacity-100': clientStore.showHeadDetail },
      { 'invisible transition-all duration-500 bg-black bg-opacity-50 opacity-0': !clientStore.showHeadDetail },
    ]"
    />
</template>

<script lang="ts" setup>

import { UserType } from '~/types/userType';

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useUserStore } from '~/store/user';
const userStore = useUserStore();


let headDetail = ref<UserType>({
  address: null,
  birthday: null,
  details: null,
  email: null,
  id: '',
  More_info: null,
  phone: null,
  role: null,
});

const showHeadDetail = (prop: UserType) => {
  headDetail.value = prop;
  clientStore.showHeadDetail = true;

} 

</script>