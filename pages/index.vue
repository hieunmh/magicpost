<template>
  <MainLayout>
    <OrderTracking />
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';


definePageMeta({middleware: 'role'});

</script>
