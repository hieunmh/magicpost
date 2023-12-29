<template>
  <Title>Magic Post</Title>

  <VitePwaManifest />

  <Loading v-if="clientStore.isLoading" />
  
  <div v-else class="h-full w-full fixed">
    <MenuOverlay 
      :class="[
        {'max-h-[100vh] opacity-100 transition-all duration-500 visible': clientStore.isMenuOverlay },
        {'max-h-[100vh] opacity-0 transition-all duration-500 invisible': !clientStore.isMenuOverlay },
      ]"
    />

    <AddPhoneNumber  v-if="user && !userStore.userInfo?.phone"
      :class="[
        {'visible transition-all duration-1000 bg-black bg-opacity-50 opacity-100': !clientStore.havePhone },
        {'invisible transition-all duration-1000 bg-black bg-opacity-50 opacity-0': clientStore.havePhone },
      ]"
    />

    <NuxtPage />
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

onMounted(() => {
  clientStore.isMenuOverlay = false;
  clientStore.windowWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    clientStore.windowWidth = window.innerWidth;
  });

  clientStore.ceonavigatorTab = 'system';
})

watch(() => clientStore.windowWidth, () => {
  if (clientStore.windowWidth >= 767) {
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
    const allAgg = await useFetch('/api/auth/Aggregation/getAllAggregationPoints');
    aggregationStore.allAggregationPoint = allAgg.data.value;

    const allTran = await useFetch('/api/auth/Transaction/getAllTransactionPoints');
    transactionStore.allTransactionPoint = allTran.data.value;

    const data = await useFetch('/api/auth/Ceo/getAllAggregationHead');
    aggregationStore.allAggHead = data.data.value;

    const allTranHead = await useFetch('/api/auth/Ceo/getAllTransactionHead');
    transactionStore.allTransactionHead = allTranHead.data.value;

  }

  else if (userStore.userInfo.role?.toLowerCase() != 'transaction_point_head' && route.fullPath == '/profile/transaction_point_head') {
    router.push('/');
  }
  
  
  else if (userStore.userInfo.role?.toLowerCase() == 'transaction_point_head'){
    const { data, error } = await useFetch('/api/auth/Transaction/getAllTransactionEmployee');
    const newPackage = await useFetch('/api/auth/Transaction/getAllNewPackagesInTransaction');
    const sentPackage = await useFetch('/api/auth/Transaction/getAllSentPackagesInTransaction');
    const allPackage = await useFetch('/api/auth/Packages/getAllPackagesInfo');
    
    packageStore.allNewPackage = newPackage.data.value;
    packageStore.allSendPackage = sentPackage.data.value;
    packageStore.allPackage = allPackage.data.value;
    userStore.allEmployee = data.value;
  }


  else if (userStore.userInfo.role?.toLowerCase() == "transaction_employee") {
    const { data, error } = await useFetch("/api/auth/Packages/getAllPackagesInfo");
    const newPackage = await useFetch("/api/auth/Transaction/getAllNewPackagesInTransaction");
    const sendPackage = await useFetch("/api/auth/Transaction/getAllSentPackagesInTransaction");
    const cancelPackage = await useFetch("/api/auth/Transaction/getAllCancelPackagesInTransaction");
    const aggregations = await useFetch("/api/auth/Transaction/getAggregationPointId");
    const allAggregationPoint = await useFetch("/api/auth/Aggregation/getAllAggregationPoints")
    clientStore.aggregations = aggregations.data.value;
    aggregationStore.allAggregationPoint = allAggregationPoint.data.value;
    packageStore.allNewPackage = newPackage.data.value;
    packageStore.allSendPackage = sendPackage.data.value;
    packageStore.allCancelPackage = cancelPackage.data.value;
    packageStore.allPackage = data.value;
    console.log(packageStore.allPackage);
  }

  if (userStore.userInfo.role?.toLowerCase() == "aggregation_point_head") {
    const { data, error } = await useFetch('/api/auth/Aggregation/getAllAggregationEmployee');
    const newPackage = await useFetch('/api/auth/Aggregation/getAllNewPackagesInAggregation');
    const sentPackage = await useFetch('/api/auth/Aggregation/getAllSentPackagesInAggregation');
    const allPackage = await useFetch('/api/auth/Packages/getAllPackagesInfo');


    // const data2 = await useFetch('/api/auth/Packages/getAllPackage'); // sai o day
    packageStore.allPackage = allPackage.data.value;
    packageStore.allNewPackage = newPackage.data.value;
    packageStore.allSendPackage = sentPackage.data.value;
    userStore.allEmployee = data.value;
  }

  clientStore.isLoading = false;
  
  if (user.value && !userStore.userInfo.phone) {
    setTimeout(() => {
      clientStore.havePhone = false;
    }, 0);
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