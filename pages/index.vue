<template>
  <MainLayout class="">
    <div class="fixed w-full h-full">
      <OrderTracking />
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const user = useSupabaseUser();

onBeforeMount( async () => {
  if (!userStore.userInfo.role) {
    await useFetch('/api/auth/loginGG', {
      method: 'post',
      body: {
        email: user.value?.email,
        id: user.value?.id,
        phone: user.value?.phone,
      }
    })
  }
})


</script>
