<template>
  <MainLayout>
    <div class="mt-6">
      <div class="w-full flex items-center justify-center">
        <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
          <div class="flex justify-between items-center">
            <button @click="navigatorTab = 'follow'" class="">
              <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
                :class="navigatorTab == 'follow' ? ' text-[#189ab4]' : 'text-gray-500'"
              >
                Nhân viên
              </h1>
            </button>

            <button @click="navigatorTab = 'cost'" class="">
              <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl  mb-4 text-center" 
                :class="navigatorTab == 'cost' ? 'text-[#189ab4]' : 'text-gray-500'"
              >
                Đơn hàng
              </h1>

            </button> 
          </div>

          <div class="h-2 w-full bg-slate-60 relative">
            <div class="absolute h-[6px] bg-[#189ab4] w-[30px] sm:w-[50px] md:w-[100px] rounded-full" 
              :class="[
                {'md:left-[20px] sm:left-[30px] left-[12px] transition-all duration-300': navigatorTab == 'follow' },
                {'md:left-[calc(100%-115px)] sm:left-[calc(100%-75px)] left-[calc(100%-45px)] transition-all duration-300': navigatorTab == 'cost' },
              ]"
            />
          </div>
        </div>
      </div>

      <div class="absolute top-30 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
        :class="[
          {'left-0 transition-all duration-300': navigatorTab == 'follow' },
          {'-left-[1500px] transition-all duration-300': navigatorTab == 'cost' },
        ]"
      >
        <div class="w-[1100px] flex p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
          <div class="w-[1100px] mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center">
            <div class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
              v-for="head in userStore.allTransactionEmployee" @click="showHeadDetail(head)"
            >
              <div class="grid grid-cols-12 h-8 items-center text-center">
                <div class="col-span-4">ID:</div>
                <div class="col-span-8">{{ head.id.substring(0, 15) }}...</div>
              </div>
              
              <div class="grid grid-cols-12 h-8 items-center text-center">
                <div class="col-span-4">Role:</div>
                <div class="col-span-8">{{ head.role }}</div>
              </div>

              <div class="grid grid-cols-12 h-8 items-center text-center">
                <div class="col-span-4">Phone:</div>
                <div class="col-span-8">0{{ head.phone?.substring(2) }}</div>
              </div>
            </div>
          </div>
        </div>
        <HeadDetail :headDetail="headDetail" 
          :class="[
            { 'visible transition-all duration-500 bg-black bg-opacity-50 opacity-100': clientStore.showHeadDetail },
            { 'invisible transition-all duration-500 bg-black bg-opacity-50 opacity-0': !clientStore.showHeadDetail },
          ]"
        />
      </div>

      <div class="absolute top-30 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
        :class="[
          {'-right-[1500px] transition-all duration-300': navigatorTab == 'follow' },
          {'right-0 transition-all duration-300': navigatorTab == 'cost' },  
        ]"
      >
        <div class="w-[1100px] flex p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
          <div class="w-[1100px] mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center">
            <div class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
              v-for="p in packageStore.allPackage" @click="showPackage(p)"
            >
              <div class="grid grid-cols-12 h-8 items-center text-center">
                <div class="col-span-4">ID:</div>
                <div class="col-span-8">{{ p.id.substring(0, 15) }}...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout> 
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { PackageType } from '~/types/packageType';
import { UserType } from '~/types/userType';

import { useUserStore } from '~/store/user';
import { usePackageStore } from '~/store/package';
const userStore = useUserStore();
const packageStore = usePackageStore();

import { useClientStore } from '~/store/client';
import HeadDetail from '~/components/HeadDetail.vue';

const clientStore = useClientStore();

let navigatorTab = ref<string>('follow');

onMounted(() => {
  navigatorTab.value = 'follow';
})

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

let packages = ref<PackageType>({
  created_at: '',
  id: '',
  receiver_id: null,
  sender_id: null,
  updated_at: null,
});

const showPackage = (prop: PackageType) => {
  packages.value = prop;
  clientStore.showPackage = true;
} 

definePageMeta({middleware: 'loggedin'});

</script>