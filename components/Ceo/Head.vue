<template>
  <div class="w-[1100px] flex flex-col items-center gap-8 h-[calc(100vh-190px)]">
    <div class="w-full flex items-center justify-center px-4 sm:px-10">
      <div class="w-full px-4 sm:px-10 pb-4 flex items-center justify-center border-b-2 border-b-[#189ab4]">
        <select class="bg-gray-200 font-semibold text-gray-500 text-sm rounded-lg p-2.5 outline-none">
          <option class="h-16 text-gray-500 font-semibold w-full" selected>Role</option>
          <option class="h-16 text-gray-500 font-semibold w-full" value="US">Aggregation</option>
          <option class="h-16 text-gray-500 font-semibold w-full" value="CA">Transaction</option>
        </select>
      </div>
    </div>

    <div v-if="!userStore.isLoading" class="w-full px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center overflow-auto scrollbar-hide">
      <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-lg font-semibold"
        v-for="head in userStore.allHead" @click="showHeadDetail(head)"
      >
        <div class="grid grid-cols-12 h-12 items-center text-center">
          <div class="col-span-4">ID:</div>
          <div class="col-span-8">{{ head.id.substring(0, 15) }}...</div>
        </div>
        
        <div class="grid grid-cols-12 h-12 items-center text-center">
          <div class="col-span-4">Role:</div>
          <div class="col-span-8">{{ head.role }}</div>
        </div>

        <div class="grid grid-cols-12 h-12 items-center text-center">
          <div class="col-span-4">Phone:</div>
          <div class="col-span-8">0{{ head.phone?.substring(2) }}</div>
        </div>

        <div class="grid grid-cols-12 h-12 items-center text-center">
          <div class="col-span-4">Address:</div>
          <div class="col-span-8">{{ head.address }}</div>
        </div>
      </div>
    </div>

    <div v-else class="w-full px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center animate-pulse">
      <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-lg font-semibold">
        <div class="h-12 bg-gray-200 rounded-lg"></div>
        
        <div class="h-12 bg-gray-200 rounded-lg"></div>

        <div class="h-12 bg-gray-200 rounded-lg"></div>

        <div class="h-12 bg-gray-200 rounded-lg"></div>
      </div>

      <div class="flex flex-col space-y-4 p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm xl:text-lg font-semibold">
        <div class="h-12 bg-gray-200 rounded-lg"></div>
        
        <div class="h-12 bg-gray-200 rounded-lg"></div>

        <div class="h-12 bg-gray-200 rounded-lg"></div>

        <div class="h-12 bg-gray-200 rounded-lg"></div>
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

onMounted( async () => {
  if (userStore.allHead?.length == 0) {
    userStore.isLoading = true;

    const allHead = await useFetch('/api/auth/getAllHead');
    userStore.allHead = allHead.data.value;

    userStore.isLoading = false;
  }
})

</script>