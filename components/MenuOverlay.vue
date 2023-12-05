<template>
  <div id="MenuOverlay" class="fixed bottom-0 z-50 w-full h-full bg-white shadow-xl">
    <div class="flex items-center justify-between h-16 border-b-[1px] bg-transparent">
      <NuxtLink to="/" class="pl-4 md:pl-0" @click="userStore.isMenuOverlay = false">
        <h1 class="text-center font-bold text-[30px] text-[#189ab4]">
          <img src="/mgpost.png" width="100" alt="">
        </h1>
      </NuxtLink>

      <button class="pr-4" @click="userStore.isMenuOverlay = false">
        <Icon name="mdi:close" size="40" class="text-gray-400" />
      </button>
    </div>

    <div class="mt-1">
      <ul class="flex flex-col justify-between font-semibold w-full">
        <li v-for="(item, index) in menu" 
          class="flex items-center px-5 cursor-pointer h-12 text-gray-500 hover:text-[#189ab4]"
        >
          <Icon :name="item.icon" size="30" class="mr-2" />
          {{ item.name }} 
        </li>
      </ul>
      <NuxtLink v-if="user" to="/profile" @click="userStore.isMenuOverlay = false">
        <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
          <Icon name="material-symbols:account-circle" size="30" class="mr-2" />
          <div>{{ user.email?.substring(0, 4) }}****@gmail.com</div>
        </div>
      </NuxtLink>
    </div>

    <div class="w-full absolute bottom-6 flex items-center justify-center">
      <button v-if="user" @click="logOut()"
        class="text-center w-[calc(100vw-50px)] font-semibold text-gray-500 hover:text-[#189ab4] border-2 py-3 rounded-lg"
      >
        <Icon v-if="isLoading" name="eos-icons:loading" size="25"  />
        <p v-else>Đăng xuất</p>
      </button>
      <div v-else class="flex items-center w-full justify-center">
        <NuxtLink to="/login" @click="userStore.isMenuOverlay = false"
          class="text-center w-[300px] font-semibold text-gray-500 hover:text-[#189ab4] border-[2px] py-3 rounded-lg ml-4 mr-2"
        >
          <p>Đăng nhập</p>
        </NuxtLink>

        <NuxtLink to="/register" @click="userStore.isMenuOverlay = false"
          class="text-center w-[300px] font-semibold text-white bg-[#189ab4] py-3 rounded-lg mr-4"
        >
          <p>Đăng ký</p>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const user = useSupabaseUser();
const client = useSupabaseClient();

const router = useRouter();

let isLoading = ref<boolean>(false);

let menu = [
  { name: 'Vận chuyển', icon: 'circum:delivery-truck' },
  { name: 'Dịch vụ', icon: 'ph:bag-simple-bold' },
  { name: 'Tư Vấn khách hàng', icon: 'mingcute:task-2-line' }
]

const logOut = async () => {
  userStore.isMenuOverlay = false;
  userStore.isLoading = true;

  await client.auth.signOut();

  setTimeout(() => {
    userStore.isLoading = false;
    router.push('/login');
  }, 1500);
  
} 

// const gotoUrl = (url: string) => {
//   router.push(url);
//   setTimeout(() => {
//     userStore.isMenuOverlay = false;
//   }, 50);
// }

</script>
