<template>
  <MainLayout class="">
    <div class="fixed w-full h-full">
      <OrderTracking />
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import { routerKey } from 'vue-router';
import MainLayout from '~/layouts/MainLayout.vue';

const user = useSupabaseUser();
const router = useRouter();

</script>
