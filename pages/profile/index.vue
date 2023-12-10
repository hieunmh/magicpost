<template>
  <MainLayout>
    <div class="w-full text-center">
      <p class="text-2xl text-gray-500">{{ user?.email }}</p>
      <p class="text-4xl font-semibold">{{ userInfo.role }} 123</p>
      <p class="text-4xl font-semibold">{{ userInfo.birthday }}</p>
      <div class="flex flex-col items-center">
        <div class="flex mt-4">
          <input type="text" name="" v-model="moreInfo" placeholder="More info"
            class="bg-gray-200 h-12 text-[18px] rounded-l-lg outline-none px-4 text-gray-500 font-semibold"
          >
          <button @click="addMoreInfo()" class="bg-[#189ab4] h-12 w-[90px] hover:bg-[#189] text-white rounded-r-lg font-semibold">
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class="animate-spin"  />
            <p v-else>Cập nhật</p>
          </button>
        </div>

        <NuxtLink to="/profile/update">
          <button class="bg-[#189ab4] hover:bg-[#189] text-white rounded-lg px-4 py-2 font-semibold mt-4">
            Cập nhật mật khẩu
          </button>
        </NuxtLink>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
definePageMeta({middleware: 'profile'});

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

const { userInfo } = storeToRefs(userStore);

let moreInfo = ref<string>('');
let isLoading = ref<boolean>(false);

const user = useSupabaseUser();

const addMoreInfo = async () => {
  isLoading.value = true;
  const { data, error } = await useFetch('/api/auth/addMoreInfo', {
    method: 'post',
    body: {
      More_info: moreInfo.value,
      userId: user.value?.id
    }
  })
  isLoading.value = false;
}

</script>