<template>
    <MainLayout>
      <div class="min-h-screen">
        <OrderTracking />
      </div>
    </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';


definePageMeta({middleware: 'role'});

</script>
