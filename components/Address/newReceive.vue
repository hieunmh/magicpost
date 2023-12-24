<template>
    <div class="w-full h-full fixed px-4 sm:px-0 top-0 left-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      :class="clientStore.showNewReceiveAddress ? 'visible opacity-100 transition-all duration-300 ease-in' 
      : 'invisible opacity-0 transition-all duration-500 ease-in'"
      @click.self="clientStore.showNewReceiveAddress = false"
    >
      <div class="w-[500px] h-[396px] px-4 bg-white rounded-lg shadow-xl z-40 border-[1px]">
        <div class="w-full h-[80px] py-4">
          <input type="text" class="h-full w-full outline-none bg-gray-100 rounded-lg px-4 text-gray-500 font-semibold text-sm"
            placeholder="Địa chỉ" :value="newReceiveAddress"
          >
        </div>
  
        <div class="border-[1.5px] rounded-lg">
          <div class="h-[46px] flex text-xs sm:text-sm">
            <button class="w-1/3 flex items-center justify-center text-center font-semibold cursor-pointer"
              @click="() => { showReceiveProvince = true; showReceiveDistrict = false; showReceiveWard = false; }"
              :class="showReceiveProvince ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Tỉnh / Thành phố
            </button>
  
            <button class="w-1/3 flex items-center justify-center text-center font-semibold cursor-pointer"
              @click="() => { showReceiveProvince = false; showReceiveDistrict = true; showReceiveWard = false; }" 
              :disabled="province.length < 1"
              :class="showReceiveDistrict ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Quận / Huyện
            </button>
  
            <button class="w-1/3 flex items-center justify-center text-center font-semibold cursor-pointer"
              @click="() => { showReceiveProvince = false; showReceiveDistrict = false; showReceiveWard = true; }" 
              :disabled="district.length < 1"
              :class="showReceiveWard ? 'text-[#189ab4]' : 'text-gray-500'"
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
  
          <div class="w-full h-[245px] overflow-y-scroll text-sm scrollbar-hide">
            <option v-if="showReceiveProvince" v-for="(province) in clientStore.provinces" :key="province" 
              @click="getReceiveDistricts(province.code, province.name)"
              class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            >
              {{ province.name }}
            </option>
  
            <option v-if="showReceiveDistrict" v-for="(district) in filterDistrict" :key="district" 
              @click="getReceiveWards(district.code, district.name)"
              class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            >
              {{ district.name }}
            </option>
  
            <option v-if="showReceiveWard" v-for="(ward) in filterWard" :key="ward"
              @click="clientStore.newReceiveWard = ' / ' + ward.name; clientStore.showNewReceiveAddress = false"
              class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            >
              {{ ward.name }}
            </option>
            
          </div>
        </div>
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
    clientStore.newReceiveProvince = name;
    clientStore.newReceiveDistrict = '';
    clientStore.newReceiveWard = '';
  
    showReceiveProvince.value = false;
    showReceiveWard.value = false;
  
  
    filterDistrict = clientStore.districts.filter((district: any) => {
      return district.province_code == code;
    });
    showReceiveDistrict.value = true;
  }
  
  const getReceiveWards = (code: any, name: string) => {
  
    clientStore.newReceiveDistrict = ' / ' + name;
    clientStore.receiveWard = '';
  
    showReceiveProvince.value = false;
    showReceiveDistrict.value = false;
    
    filterWard = clientStore.wards.filter((ward: any) => {
        return ward.district_code == code;
    })
  
    showReceiveWard.value = true;  
  }
  
  let province = computed(() => {
    return clientStore.newReceiveProvince ? clientStore.newReceiveProvince : '';
  })
  
  let district = computed(() => {
    return clientStore.newReceiveDistrict ? clientStore.newReceiveDistrict : '';
  })
  
  let newReceiveAddress = computed(() => {
    return clientStore.newReceiveProvince + clientStore.newReceiveDistrict + clientStore.newReceiveWard
    ? clientStore.newReceiveProvince + clientStore.newReceiveDistrict + clientStore.newReceiveWard : '';
  })
  
  </script>
  