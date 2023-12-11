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

definePageMeta({middleware: 'role'});

</script>
