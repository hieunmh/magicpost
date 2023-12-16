<template>
  <div class="w-full h-[300px] bg-white absolute bottom-12 rounded-lg shadow-xl z-40 border-[1px]"
    :class="clientStore.showReceiveAddress ? 'visible opacity-100 transition-all duration-300 ease-in' 
    : 'invisible opacity-0 transition-all duration-300 ease-in'"
  >
    <div class="h-[46px] flex text-sm">
      <button class="w-1/3 flex items-center justify-center text-center font-semibold text-gray-500 cursor-pointer"
        @click="() => { showReceiveProvince = true; showReceiveDistrict = false; showReceiveWard = false; }"
      >
        Tỉnh / Thành phố
      </button>

      <button class="w-1/3 flex items-center justify-center text-center font-semibold text-gray-500 cursor-pointer"
        @click="() => { showReceiveProvince = false; showReceiveDistrict = true; showReceiveWard = false; }" 
        :disabled="province.length < 1"
      >
        Quận / Huyện
      </button>

      <button class="w-1/3 flex items-center justify-center text-center font-semibold text-gray-500 cursor-pointer"
        @click="() => { showReceiveProvince = false; showReceiveDistrict = false; showReceiveWard = true; }" 
        :disabled="district.length < 1"
      >
        Phường, xã
      </button>

    </div>

    <div class="w-full h-1 bg-gray-300 relative">
      <div class="w-1/3 h-full bg-[#189ab4] absolute" 
        :class="[
          {'left-0 transition-all duration-300': showReceiveProvince },
          {'left-[calc(100%/3)] transition-all duration-300': showReceiveDistrict },
          {'left-[calc(200%/3)] transition-all duration-300': showReceiveWard },
        ]"
      />
    </div> 

    <div class="w-full h-[245px] overflow-y-scroll text-sm">
      <option v-if="showReceiveProvince" v-for="(province) in clientStore.provinces" :key="province" 
        @click="getReceiveDistricts(province.code, province.name)"
        class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 flex items-center pl-6"
      >
        {{ province.name }}
      </option>

      <option v-if="showReceiveDistrict" v-for="(district) in filterDistrict" :key="district" 
        @click="getReceiveWards(district.code, district.name)"
        class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 flex items-center pl-6"
      >
        {{ district.name }}
      </option>

      <option v-if="showReceiveWard" v-for="(ward) in filterWard" :key="ward"
        @click="clientStore.receiveWard = ' / ' + ward.name; clientStore.showReceiveAddress = false"
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


let showReceiveProvince = ref<boolean>(true);
let showReceiveDistrict = ref<boolean>(false);
let showReceiveWard = ref<boolean>(false);

let filterDistrict = ref<any>([]);
let filterWard = ref<any>([]);

const getReceiveDistricts = (code: any, name: string) => {
  clientStore.receiveProvince = name;
  clientStore.receiveDistrict = '';
  clientStore.receiveWard = '';

  showReceiveProvince.value = false;
  showReceiveWard.value = false;


  filterDistrict = clientStore.districts.filter((district: any) => {
    return district.province_code == code;
  });
  showReceiveDistrict.value = true;
}

const getReceiveWards = (code: any, name: string) => {

  clientStore.receiveDistrict = ' / ' + name;
  clientStore.receiveWard = '';

  showReceiveProvince.value = false;
  showReceiveDistrict.value = false;
  
  filterWard = clientStore.wards.filter((ward: any) => {
      return ward.district_code == code;
  })

  showReceiveWard.value = true;  
}

let province = computed(() => {
  return clientStore.receiveProvince ? clientStore.receiveProvince : '';
})

let district = computed(() => {
  return clientStore.receiveDistrict ? clientStore.receiveDistrict : '';
})

</script>
