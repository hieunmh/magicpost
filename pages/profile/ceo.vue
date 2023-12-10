<template>
  <MainLayout>
    <div class="w-full font-semibold text-4xl">CEO</div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

definePageMeta({middleware: ['profile', 'ceo']});


</script>