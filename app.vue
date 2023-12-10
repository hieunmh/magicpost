<template>
  <Title>Magic Post</Title>

  <VitePwaManifest />

  <Loading v-if="clientStore.isLoading" />
  
  <div v-else class="h-full w-full fixed">
    <MenuOverlay 
      :class="[
        {'max-h-[100vh] -left-[0] transition-all duration-500 visible': clientStore.isMenuOverlay },
        {'max-h-[100vh] -left-[100%] transition-all duration-500 invisible': !clientStore.isMenuOverlay },
      ]"
    />

    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useUserStore } from '~/store/user';
const  userStore = useUserStore();

let { userInfo } = storeToRefs(userStore);
// let { roles } = storeToRefs(clientStore);

const route = useRoute();
const router = useRouter();

const user = useSupabaseUser();
const client = useSupabaseClient();

watchEffect(() => {
  setTimeout(() => {
    clientStore.isLoading = false;
  }, 1500);
})

let windowWidth = ref<number>(process.client ? window.innerWidth : 0);

onMounted(() => {
  clientStore.isMenuOverlay = false;
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth;
  });
})

watch(() => windowWidth.value, () => {
  if (windowWidth.value >= 767) {
    clientStore.isMenuOverlay = false;
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

onMounted( async () => {
  const { data, error } = await useFetch(`/api/auth/getUserById/${user.value?.id}`);
  userInfo.value = data.value;
})

onMounted( async () => {
  const {  data, error } = await useFetch(`/api/getRole`);  
  clientStore.roles = data.value || [];
  
})

</script> 