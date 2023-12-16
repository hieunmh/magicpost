<template>
  <div class="w-full h-full fixed z-50 top-[0] px-4 sm:px-0 flex items-center justify-center bg-black bg-opacity-50"
    @click.self="clientStore.showHeadDetail = false"
  >
    <div class="w-[500px] h-[500px] bg-white rounded-xl font-semibold text-2xl" 
    >
      {{ headDetail }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserType } from '~/types/userType';
import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

const props = defineProps<{ headDetail: UserType }>();

const { headDetail } = toRefs(props);

</script>
