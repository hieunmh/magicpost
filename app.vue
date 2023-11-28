<template>
  <Loading v-if="userStore.isLoading" />
  <div v-else class="h-full w-full fixed">
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

watchEffect(() => {
  setTimeout(() => {
    userStore.isLoading = false;
  }, 1000);
})

let windowWidth = ref<number>(process.client ? window.innerWidth : 0);

onMounted(() => {
  userStore.isMenuOverlay = false;
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth;
  });
})

watch(() => windowWidth.value, () => {
  if (windowWidth.value > 767) {
    userStore.isMenuOverlay = false;
  }
})
</script>