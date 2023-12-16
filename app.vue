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

    <AddPhoneNumber  v-if="user && !userStore.userInfo?.phone"
      :class="[
        {'visible transition-all duration-1000 bg-black bg-opacity-50 opacity-100': !clientStore.havePhone },
        {'invisible transition-all duration-1000 bg-black bg-opacity-50 opacity-0': clientStore.havePhone },
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

const route = useRoute();
const router = useRouter();

const user = useSupabaseUser();
const client = useSupabaseClient();

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
  if (user.value) {
    const { data, error } = await useFetch(`/api/auth/getUserById/${user.value?.id}`);
    userStore.userInfo = data.value;  
  }

  if (userStore.userInfo.role?.toLowerCase() != 'ceo' && route.fullPath == '/profile/ceo') {
    router.push('/');
  }

  else if (userStore.userInfo.role?.toLowerCase() == 'ceo') {
    const { data, error } = await useFetch('/api/auth/getAllHead');
    userStore.allHead = data.value;
  }

  if (!user.value) {
    setTimeout(() => {
      clientStore.isLoading = false;
    }, 1500);
  }

  else {
    clientStore.isLoading = false;
  }

  if (user.value && !userStore.userInfo.phone) {
    setTimeout(() => {
      clientStore.havePhone = false;
    }, 300);
  }
})

onMounted( async () => {
  const { data } = await useFetch('https://provinces.open-api.vn/api/p/');
  clientStore.provinces = data.value;

  clientStore.provinces.forEach((pro: any) => {
    if (pro.name.includes('Tỉnh')) {
      pro.name = pro.name.substring(5);
    }

    if (pro.name.includes('Thành phố')) {
      pro.name = pro.name.substring(10)
    }
  })

  clientStore.provinces.sort((a: any, b: any) => {
    return a.name.localeCompare(b.name)
  });
})

onMounted( async () => {
  const { data } = await useFetch('https://provinces.open-api.vn/api/d/');
  clientStore.districts = data.value;
})

onMounted( async () => {
  const { data } = await useFetch('https://provinces.open-api.vn/api/w/');
  clientStore.wards = data.value;
 
} )

</script> 