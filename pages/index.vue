<template>
  <MainLayout class="">
    <div class="fixed w-full h-full mt-20">
      <OrderTracking />
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

const user = useSupabaseUser();

definePageMeta({middleware: 'role'});

</script>
