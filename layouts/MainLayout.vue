<template>
  <div>
    <div id="header" class="h-16 bg-white w-full flex items-center justify-between md:justify-evenly shadow-lg border-b-[1px]">
      <NuxtLink to="/" class="pl-4 md:pl-0" @click="userStore.isMenuOverlay = false">
        <h1 class="text-center font-bold text-[30px] text-[#189ab4]">MG</h1>
      </NuxtLink>

      <div class="hidden md:block">
        <ul class="flex justify-between font-semibold w-full">
          <li v-for="(item, index) in menu" class="px-5 cursor-pointer text-gray-500 hover:text-[#189ab4]">
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="hidden md:block">
        <div v-if="user" class="flex items-center cursor-pointer h-full w-[200px]" 
          @mouseover="() => showMenu = true" @mouseleave="() => showMenu = false"
        >
          <div class="flex text-center items-center justify-between w-full text-gray-500 font-semibold">
            <Icon name="material-symbols:account-circle" size="40" />
            <div>*******{{ user?.phone?.substring(8, 11) }}</div>
            <Icon name="ic:baseline-keyboard-arrow-down" size="30" />
          </div>

          <div class="absolute top-16 bg-white w-[200px] rounded-b-lg text-gray-500 shadow-xl" 
            :class="showMenu ? 'visible opacity-100 z-50 transition-all duration-300 ease-in' 
            : 'invisible opacity-0 transition-all duration-300 ease-in z-50'"
          >
            <NuxtLink to="/profile" class="font-semibold h-12 flex items-center justify-center">
              <div class="font-semibold text-center w-full hover:text-[#189ab4]">
                Trang cá nhân
              </div>
            </NuxtLink>

            <button v-if="user" @click="logOut()" class=" w-full rounded-lg h-12 font-semibold hover:text-[#189ab4]"> 
              <Icon v-if="isLoading" name="eos-icons:loading" size="25"  />
              <p v-else>Đăng xuất</p>
            </button>
          </div>
        </div>
        
        <div v-else class="flex justify-between w-[200px]">
          <NuxtLink to="/register">
            <button  class=" w-full rounded-lg h-10 font-semibold hover:text-[#189ab4]"> 
              Đăng ký
            </button>
          </NuxtLink>

          <NuxtLink to="/login" class="">
            <button  class=" w-full rounded-lg h-10 font-semibold bg-[#189ab4] hover:bg-[#189] text-white px-4"> 
              Đăng nhập
            </button>
          </NuxtLink>
        </div>
      </div>

      <button v-if="!userStore.isMenuOverlay" class="md:hidden block pr-4" @click="userStore.isMenuOverlay = true">
        <Icon name="ci:hamburger-md" size="40" class="text-gray-400" />
        
      </button>

      <button v-else class="md:hidden block pr-4" @click="userStore.isMenuOverlay = false">
        <Icon name="mdi:close" size="40" class="text-gray-400" />
      </button>

      <MenuOverlay 
        :class="[
          {'max-h-[calc(100vh-64px)] transition-all duration-200 visible': userStore.isMenuOverlay },
          {'max-h-0 transition-all duration-200 invisible': !userStore.isMenuOverlay },
        ]"
    />
    </div>
    
    <slot />
  </div>
</template>

<script lang="ts" setup>

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

let isLoading = ref<boolean>(false);

let showMenu = ref<boolean>(false);



let menu = [
  'Vận chuyển',
  'Dịch vụ',
  'Tư Vấn khách hàng',
]

const logOut = async () => {
  isLoading.value = true;
  await client.auth.signOut();
  isLoading.value = false;
  
  router.push('/login');
} 


</script>

