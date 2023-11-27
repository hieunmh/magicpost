<template>
  <div id="MenuOverlay" class="fixed bottom-0 z-50 w-full h-full bg-white">
    <div class="mt-4">
      <NuxtLink to="/profile" @click="userStore.isMenuOverlay = false">
        <div class="text-gray-500 font-semibold px-5 h-12 flex items-center hover:text-[#189ab4]">
          <Icon name="material-symbols:account-circle" size="30" class="mr-2" />
          Trang cá nhân
        </div>
      </NuxtLink>
      <ul class="flex flex-col justify-between font-semibold w-full">
        <li v-for="(item, index) in menu" 
          class="flex items-center px-5 cursor-pointer h-12 text-gray-500 hover:text-[#189ab4]"
        >
          <Icon :name="item.icon" size="30" class="mr-2" />
          {{ item.name }} 
        </li>
      </ul>
    </div>

    <div class="w-full absolute bottom-6 flex items-center justify-center">
      <button @click="logOut()"
        class="text-center w-[calc(100vw-50px)] font-semibold text-gray-500 hover:text-[#189ab4] border-2 py-3 rounded-lg"
      >
        <Icon v-if="isLoading" name="eos-icons:loading" size="25"  />
        <p v-else>Đăng xuất</p>
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const client = useSupabaseClient();

const router = useRouter();

let isLoading = ref<boolean>(false);

let menu = [
  { name: 'Vận chuyển', icon: 'circum:delivery-truck' },
  { name: 'Dịch vụ', icon: 'ph:bag-simple-bold' },
  { name: 'Tư Vấn khách hàng', icon: 'mingcute:task-2-line' }
]

const logOut = async () => {
  isLoading.value = true;
  await client.auth.signOut();
  isLoading.value = false;
  userStore.isMenuOverlay = false;
  router.push('/login');
}

</script>
