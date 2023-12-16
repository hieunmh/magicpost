<template>
  <div class="w-full h-[300px] bg-white absolute bottom-12 rounded-lg shadow-xl z-40 border-[1px]"
    :class="clientStore.showSendAddress ? 'visible opacity-100 transition-all duration-300 ease-in absolute' 
    : 'invisible opacity-0 transition-all duration-300 ease-in'"
  >
    <div class="h-[46px] flex text-sm">
      <button class="w-1/3 flex items-center justify-center text-center font-semibold text-gray-500 cursor-pointer"
        @click="() => { showProvince = true; showDistrict = false; showWard = false; }"
      >
        Tỉnh / Thành phố
      </button>

      <button class="w-1/3 flex items-center justify-center text-center font-semibold text-gray-500 cursor-pointer"
        @click="() => { showProvince = false; showDistrict = true; showWard = false; }" 
        :disabled="province.length < 1"
      >
        Quận / Huyện
      </button>

      <button class="w-1/3 flex items-center justify-center text-center font-semibold text-gray-500 cursor-pointer"
        @click="() => { showProvince = false; showDistrict = false; showWard = true; }" 
        :disabled="district.length < 1"
      >
        Phường, xã
      </button>

    </div>

    <div class="w-full h-1 bg-gray-300 relative">
      <div class="w-1/3 h-full bg-[#189ab4] absolute" 
        :class="[
          {'left-0 transition-all duration-300': showProvince },
          {'left-[calc(100%/3)] transition-all duration-300': showDistrict },
          {'left-[calc(200%/3)] transition-all duration-300': showWard },
        ]"
      />
    </div> 

    <div class="w-full h-[245px] overflow-y-scroll text-sm">
      <option v-if="showProvince" v-for="(province) in clientStore.provinces" :key="province" 
        @click="getDistricts(province.code, province.name)"
        class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 flex items-center pl-6"
      >
        {{ province.name }}
      </option>

      <option v-if="showDistrict" v-for="(district) in filterDistrict" :key="district" 
        @click="getWards(district.code, district.name)"
        class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 flex items-center pl-6"
      >
        {{ district.name }}
      </option>

      <option v-if="showWard" v-for="(ward) in filterWard" :key="ward"
        @click="clientStore.sendWard = ' / ' + ward.name; clientStore.showSendAddress = false"
        class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 flex items-center pl-6"
      >
        {{ ward.name }}
      </option>
      
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

let showProvince = ref<boolean>(true);
let showDistrict = ref<boolean>(false);
let showWard = ref<boolean>(false);

let filterDistrict = ref<any>([]);
let filterWard = ref<any>([]);

const getDistricts = (code: any, name: string) => {
  clientStore.sendProvince = name;
  clientStore.sendDistrict = '';
  clientStore.sendWard = '';

  showProvince.value = false;
  showWard.value = false;

  filterDistrict = clientStore.districts.filter((district: any) => {
    return district.province_code == code;
  });
  showDistrict.value = true;
  
}

const getWards = (code: any, name: string) => {
  clientStore.sendDistrict = ' / ' + name;
  clientStore.sendWard = '';

  showProvince.value = false;
  showDistrict.value = false;
  
  filterWard = clientStore.wards.filter((ward: any) => {
      return ward.district_code == code;
  })

  showWard.value = true;  
}

let province = computed(() => {
  return clientStore.sendProvince ? clientStore.sendProvince : '';
})

let district = computed(() => {
  return clientStore.sendDistrict ? clientStore.sendDistrict : '';
})


</script>
