<template>
  <MainLayout class="">
    <div class="w-full text-center">
      <p class="text-2xl text-gray-500">{{  }}</p>
      <p>{{ userInfo.birthday }}</p>
      <NuxtLink to="/profile/update">
        <button class="bg-[#189ab4] hover:bg-[#189] text-white rounded-lg px-4 py-2 font-semibold mt-4">
          Cập nhật mật khẩu
        </button>
      </NuxtLink>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);

const user = useSupabaseUser();


definePageMeta({middleware: 'profile'});




</script>