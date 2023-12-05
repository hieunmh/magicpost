<template>
  <MainLayout class="">
    <div>
      {{ user }}
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