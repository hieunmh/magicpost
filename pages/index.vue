<template>
  <div class="hidden md:block">
    <MainLayout>
        <OrderTracking />
    </MainLayout>
  </div>

  <div class="block md:hidden">
    <OrderTracking />
  </div>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';


definePageMeta({middleware: 'role'});

</script>
