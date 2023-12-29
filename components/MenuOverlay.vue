<template>
  <div id="MenuOverlay" class="fixed bottom-0 z-50 w-full h-full bg-black bg-opacity-20 flex justify-end shadow-xl"
    @click.self="clientStore.isMenuOverlay = false"
  >
    <div class="w-[250px] rounded-l-xl h-full bg-white flex flex-col justify-between absolute"
      :class="[
        {'right-0 transition-all duration-500': clientStore.isMenuOverlay },
        {'-right-[250px] transition-all duration-500': !clientStore.isMenuOverlay },
      ]"
    >
      <div class="flex flex-col items-center justify-between h-16 border-b-[1px] bg-transparent">
        <div class="flex items-center justify-between w-full h-full">
          <button class="h-16 w-16 rounded-full items-center" @click="clientStore.isMenuOverlay = false">
            <Icon name="solar:close-square-bold" size="40" class="text-gray-300" />
          </button>
        </div>
      
        <div class="mt-2 w-full">
          <ul class="flex flex-col justify-between font-semibold w-full">
            <li v-for="(item, index) in menu" 
              class="flex items-center px-5 cursor-pointer h-12 text-gray-500 hover:text-[#189ab4]"
            >
              <Icon :name="item.icon" size="30" class="mr-2" />
              {{ item.name }} 
            </li>
          </ul>

          <NuxtLink v-if="user" to="/profile" @click="clientStore.isMenuOverlay = false">
            <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
              <Icon name="material-symbols:account-circle" size="30" class="mr-2" />
              <div>{{ user.email?.substring(0, 4) }}****@gmail.com</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="userStore.userInfo && userStore.userInfo.role && userStore.userInfo.role?.toLowerCase() == 'ceo'" 
            to="/profile/ceo" @click="clientStore.isMenuOverlay = false"
          >
            <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
              <Icon name="eos-icons:admin-outlined" size="30" class="mr-2" />
              <div>CEO</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="userStore.userInfo && userStore.userInfo.role && userStore.userInfo.role?.toLowerCase() == 'transaction_employee'" 
            to="/profile/transactionemployee" @click="clientStore.isMenuOverlay = false"
          >
            <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
              <Icon name="eos-icons:admin-outlined" size="30" class="mr-2" />
              <div>Transaction Employee</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="userStore.userInfo && userStore.userInfo.role && userStore.userInfo.role?.toLowerCase() == 'transaction_point_head'" 
            to="/profile/transaction_point_head" @click="clientStore.isMenuOverlay = false"
          >
            <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
              <Icon name="eos-icons:admin-outlined" size="30" class="mr-2" />
              <div>Transaction Point Head</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="userStore.userInfo && userStore.userInfo.role && userStore.userInfo.role?.toLowerCase() == 'aggregation_point_head'" 
            to="/profile/aggregation" @click="clientStore.isMenuOverlay = false"
          >
            <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
              <Icon name="eos-icons:admin-outlined" size="30" class="mr-2" />
              <div>Aggregation Point Head</div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="userStore.userInfo && userStore.userInfo.role && userStore.userInfo.role?.toLowerCase() == 'aggregation_employee'"  
            to="/profile/aggregationemployee" class="font-semibold h-12 flex items-center justify-center"
          >
            <div class="font-semibold text-center w-full hover:text-[#189ab4]">
              Aggregation Employee
            </div>
          </NuxtLink>
        </div>
      </div>

      

      <div class="w-full mb-6 flex items-center justify-center">
       <div v-if="user" class="w-full px-4">
          <button @click="logOut()"
            class="text-center w-full font-semibold text-gray-500 hover:text-[#189ab4] border-2 py-3 rounded-lg"
          >
            <p>Đăng xuất</p>
          </button>
       </div>

        <div v-else class="flex items-center w-full justify-center px-4 space-x-2">
          <NuxtLink to="/login" @click="clientStore.isMenuOverlay = false"
            class="text-center w-[50%] font-semibold text-white bg-[#189ab4] hover:bg-[#189] py-3 rounded-lg"
          >
            <p>Đăng Nhập</p>
          </NuxtLink>

          <NuxtLink to="/register" @click="clientStore.isMenuOverlay = false"
            class="text-center w-[50%] font-semibold text-gray-500 hover:text-[#189ab4] border-[2px] py-3 rounded-lg"
          >
            <p>Đăng Ký</p>
          </NuxtLink>

        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const user = useSupabaseUser();
const client = useSupabaseClient();

const router = useRouter();

let menu = [
  { name: 'Vận chuyển', icon: 'circum:delivery-truck' },
  { name: 'Dịch vụ', icon: 'ph:bag-simple-bold' },
  { name: 'Tư Vấn khách hàng', icon: 'mingcute:task-2-line' }
]

const logOut = async () => {
  clientStore.isMenuOverlay = false;
  clientStore.isLoading = true;

  await client.auth.signOut();

  setTimeout(() => {
    clientStore.isLoading = false;
    router.push('/login');
  }, 1500);
  
} 
</script>
