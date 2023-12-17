<template>
  <MainLayout>
    <div class="w-full h-full mt-6">
      <div class="w-full flex items-center justify-center">
        <div class="sm:w-[800px] w-[400px] px-2 sm:px-16 md:px-0">
          <div class="flex justify-between md:text-lg sm:text-sm text-xs">
            <button class="w-1/3" @click="clientStore.ceonavigatorTab = 'system'">
              <h1 class="font-semibold mb-4 text-center" 
                :class="clientStore.ceonavigatorTab == 'system' ? 'text-[#189ab4]' : 'text-gray-500'"
              >
                Quản lý hệ thống
              </h1>
            </button>

            <button class="w-1/3" @click="clientStore.ceonavigatorTab = 'account'"
              :class="clientStore.ceonavigatorTab == 'account' ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              <h1 class="font-semibold mb-4 text-center">
                Quản lý tài khoản
              </h1>
            </button> 

            <button class="w-1/3" @click="clientStore.ceonavigatorTab = 'statistical'"
              :class="clientStore.ceonavigatorTab == 'statistical' ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              <h1 class="font-semibold mb-4 text-center">
                Thống kê hàng gửi
              </h1>
            </button> 
          </div>

          <div class="h-2 w-full bg-slate-60 relative">
            <div class="absolute h-[6px] w-1/3 rounded-full px-4 sm:px-10" 
              :class="[
                {'left-[0px] transition-all duration-300': clientStore.ceonavigatorTab == 'system' },
                {'left-[calc(100%/3)] transition-all duration-300': clientStore.ceonavigatorTab == 'account' },
                {'left-[calc(200%/3)] transition-all duration-300': clientStore.ceonavigatorTab == 'statistical' },
              ]"
            >
              <div class=" h-full w-full bg-[#189ab4] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center absolute"
        :class="[
          {'right-[3600px] transition-all duration-300': clientStore.ceonavigatorTab == 'statistical' },
          {'right-[1800px] transition-all duration-300': clientStore.ceonavigatorTab == 'account'  },  
          {'-right-[0px] transition-all duration-300': clientStore.ceonavigatorTab == 'system'  },     
        ]"
      > 
        <CeoSystemPoint />
      </div>

      <div class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center absolute"
        :class="[
          {'right-[1800px] transition-all duration-300': clientStore.ceonavigatorTab == 'statistical' },
          {'right-0 transition-all duration-300': clientStore.ceonavigatorTab == 'account'  },  
          {'-right-[1800px] transition-all duration-300': clientStore.ceonavigatorTab == 'system'  },     
        ]"
      > 
        <CeoHead />
      </div>

      <div class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center absolute"
        :class="[
          {'right-0 transition-all duration-300': clientStore.ceonavigatorTab == 'statistical' },
          {'-right-[1800px] transition-all duration-300': clientStore.ceonavigatorTab == 'account'  },  
          {'-right-[3600px] transition-all duration-300': clientStore.ceonavigatorTab == 'system'  },     
        ]"
      >
        <CeoStatistical />
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { UserType } from '~/types/userType';

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();


definePageMeta({middleware: 'loggedin'});

</script>