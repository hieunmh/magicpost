<template>
  <MainLayout>
    <div class="w-full h-full flex items-center justify-center">
      <div class="w-full mt-6 px-4 sm:px-10 flex items-center justify-center">
        <div class="w-[1100px] flex flex-col h-14 sm:h-28 p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
          <div v-for="agg in allAggregationHead" class="">
            {{ agg }}
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/store/user';
import { UserType } from '~/types/userType';
const userStore = useUserStore();

definePageMeta({middleware: ['profile']});


let allAggregationHead = ref<UserType[] | null>([])

onMounted( async () => {
  const { data, error } = await useFetch('/api/auth/getAllAggregationHead');
  console.log(typeof data.value);
  // userStore.allAggregationHead = data.value;

  allAggregationHead.value = data.value;
})

</script>