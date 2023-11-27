<template>
  <MainLayout class="">
    <div>
      {{ user }}
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';

const user = useSupabaseUser();
</script>