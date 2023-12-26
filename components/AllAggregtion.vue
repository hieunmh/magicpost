<template>
  <div class="w-full h-full fixed px-4 sm:px-0 top-0 left-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    :class="clientStore.showAggLocation ? 'visible opacity-100 transition-all duration-300 ease-in' 
    : 'invisible opacity-0 transition-all duration-300 ease-in'"
    @click.self="clientStore.showAggLocation = false"
  >
    <div class="w-[500px] h-[396px] px-4 bg-white rounded-lg shadow-xl z-40 border-[1px]">
      <div class="w-full h-[80px] py-4">
        <input type="text" class="h-full w-full outline-none bg-gray-100 rounded-lg px-4 text-gray-500 font-semibold text-sm mb-2"
          placeholder="Địa chỉ" :value="agg"
          @click="showProvince=true"
        >
        <div class="w-full h-[316px] overflow-y-scroll text-sm scrollbar-hide border-[1.5px] rounded-lg">
          <option v-if="showProvince" v-for="(province) in clientStore.provinces" :key="province" 
            @click="clientStore.showAggLocation = false"
            class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
          >
            {{ province.name }}
          </option>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

let showProvince = ref<boolean>(true);

let agg = computed(() => {
  return clientStore.sendProvince 
  ? clientStore.sendProvince : '';
})

</script>