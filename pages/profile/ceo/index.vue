<template>
  <MainLayout>
    <div class="w-full h-full mt-6">
      <div class="w-full flex items-center justify-center fixed"
        :class="[
          {'invisible opacity-0 top-[100vh] transition-all duration-700': clientStore.ceonavigatorTab == 'statistical' },
          {'invisible opacity-0 top-[100vh] transition-all duration-700': clientStore.ceonavigatorTab == 'account'  },  
          {'visible opacity-100 top-20 transition-all duration-700': clientStore.ceonavigatorTab == 'system'  },     
        ]"
      > 
        <CeoSystemPoint />
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();

definePageMeta({middleware: 'loggedin'});
const client = useSupabaseClient();



</script>