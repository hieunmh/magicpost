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
import { usePackageStore } from '~/store/package';
import { useAggregationStore } from '~/store/aggregation';
import { useTransactionStore } from './store/transaction';

const userStore = useUserStore();
const packageStore = usePackageStore();
const aggregationStore = useAggregationStore();
const transactionStore = useTransactionStore();

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

  clientStore.ceonavigatorTab = 'system';
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

    const allTran = await useFetch('/api/auth/Transaction/getAllTransactionPoints');
    transactionStore.allTransactionPoint = allTran.data.value;
  }

  if (userStore.userInfo.role?.toLowerCase() != 'transaction_point_head' && route.fullPath == '/profile/transaction_point_head') {
    router.push('/');
  }
  
  
  else if (userStore.userInfo.role?.toLowerCase() == 'transaction_point_head'){
    const { data, error } = await useFetch('/api/auth/Transaction/getAllTransactionEmployee');
    // const data2 = await useFetch('/api/auth/Packages/getAllPackage'); // sai o day
    userStore.allTransactionEmployee = data.value;
    // packageStore.allPackage = data2.data.value;
  }

  
  if (userStore.userInfo.role?.toLowerCase() == "transaction_employee") {
    const { data, error } = await useFetch("/api/auth/Packages/getAllPackagesIn1Transaction");
<<<<<<< Updated upstream
    const newPackage = await useFetch("/api/auth/Packages/getAllNewPackagesIn1Transaction");
    const shippedPackage = await useFetch("/api/auth/Packages/getAllShippedPackagesIn1Transaction");
    const sendPackage = await useFetch("/api/auth/Packages/getAllSendPackagesIn1Transaction");
    packageStore.allNewPackage = newPackage.data.value;
    packageStore.allShippedPackage = shippedPackage.data.value;
    packageStore.allSendPackage = sendPackage.data.value;
=======

    const newPackage = await useFetch("/api/auth/Transaction/getAllNewPackagesInTransaction");
    // const shippedPackage = await useFetch("/api/auth/Packages/getAllShippedPackagesIn1Transaction");
    const sentPackage = await useFetch("/api/auth/Transaction/getAllSentPackagesInTransaction");
    packageStore.allNewPackage = newPackage.data.value;
    // packageStore.allShippedPackage = shippedPackage.data.value;
    packageStore.allSentPackage = sentPackage.data.value;
>>>>>>> Stashed changes
    packageStore.allPackage = data.value;

  }

  if (userStore.userInfo.role?.toLowerCase() == "aggregation_point_head") {
    const { data, error } = await useFetch('/api/auth/aggregation/getAllAggregationEmployee');
<<<<<<< Updated upstream
    const data2 = await useFetch('/api/auth/Packages/getAllPackage');
    userStore.allAggrEmployee = data.value;
    aggregationStore.allPackage = data2.data.value;
=======
    const newPackage = await useFetch('/api/auth/aggregation/getAllNewPackagesInAggregation');
    const sentPackage = await useFetch('/api/auth/aggregation/getAllSentPackagesInAggregation');
    userStore.allAggrEmployee = data.value;
    aggregationStore.allPackage = newPackage.data.value;
    aggregationStore.allSentPackage = sentPackage.data.value;
>>>>>>> Stashed changes
  }

  clientStore.isLoading = false;
  
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