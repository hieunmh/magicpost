<template>
  <MainLayout class="">
    <div class="w-full text-center">
      <p class="text-2xl text-gray-500">{{ user.email }}</p>
      <NuxtLink to="/profile/update">
        <button class="bg-[#189ab4] hover:bg-[#189] text-white rounded-lg px-4 py-2 font-semibold mt-4">
          Cập nhật mật khẩu
        </button>
      </NuxtLink>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const user = useSupabaseUser();
definePageMeta({middleware: 'profile'});

onMounted(() => {
  if (userStore.isMenuOverlay == true) {
    setTimeout(() => {
      userStore.isMenuOverlay = false;
    }, 0);
  }
})

</script>