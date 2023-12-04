<template>
  <Title>Magic Post</Title>

  <VitePwaManifest />

  <Loading v-if="userStore.isLoading" />
  
  <div v-else class="h-full w-full fixed">
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

onMounted(() => {
  client.auth.onAuthStateChange((_, _session) => {
    if (_session && _session.user) {
      router.push('/');
    }
  })
})

</script>