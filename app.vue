<template>
  <Title>Magic Post</Title>

  <VitePwaManifest />

  <Loading v-if="userStore.isLoading" />
  
  <div v-else class="h-full w-full fixed">
    <MenuOverlay 
      :class="[
        {'max-h-[100vh] -left-[0] transition-all duration-500 visible': userStore.isMenuOverlay },
        {'max-h-[100vh] -left-[100%] transition-all duration-500 invisible': !userStore.isMenuOverlay },
      ]"
    />

    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const user = useSupabaseUser();
const client = useSupabaseClient();

watchEffect(() => {
  setTimeout(() => {
    userStore.isLoading = false;
  }, 2500);
})

let windowWidth = ref<number>(process.client ? window.innerWidth : 0);

onMounted(() => {
  userStore.isMenuOverlay = false;
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth;
  });
})

watch(() => windowWidth.value, () => {
  if (windowWidth.value >= 767) {
    userStore.isMenuOverlay = false;
  }
})

onMounted(() => {
  if (user.value && route.fullPath.includes('code')) {
    router.push('/');
  }
})

onMounted(() => {
  if (route.fullPath.includes('resetPassword')) {
    router.push('/profile/update')
  }
})

</script>