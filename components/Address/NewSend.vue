<template>
    <div class="w-full h-full fixed px-4 sm:px-0 top-0 left-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      :class="clientStore.showNewSendAddress ? 'visible opacity-100 transition-all duration-300 ease-in' 
      : 'invisible opacity-0 transition-all duration-300 ease-in'"
      @click.self="clientStore.showNewSendAddress = false"
    >
      <div class="w-[500px] h-[396px] px-4 bg-white rounded-lg shadow-xl z-40 border-[1px]">
        <div class="w-full h-[80px] py-4">
          <input type="text" class="h-full w-full outline-none bg-gray-100 rounded-lg px-4 text-gray-500 font-semibold text-sm"
            placeholder="Địa chỉ" :value="newSendAddress"
          >
        </div>
        
        <div class="border-[1.5px] rounded-lg">
          <div class="h-[46px] flex text-xs sm:text-sm">
            <button class="w-1/3 flex items-center justify-center text-center font-semibold cursor-pointer"
              @click="() => { showProvince = true; showDistrict = false; showWard = false; }" 
              :class="showProvince ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Tỉnh / Thành phố
            </button>
  
            <button class="w-1/3 flex items-center justify-center text-center font-semibold  cursor-pointer"
              @click="() => { showProvince = false; showDistrict = true; showWard = false; }" 
              :disabled="province.length < 1" :class="showDistrict ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Quận / Huyện
            </button>
  
            <button class="w-1/3 flex items-center justify-center text-center font-semibold cursor-pointer"
              @click="() => { showProvince = false; showDistrict = false; showWard = true; }" 
              :disabled="district.length < 1" :class="showWard ? 'text-[#189ab4]' : 'text-gray-500'"
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
  
          <div class="w-full h-[245px] overflow-y-scroll text-sm scrollbar-hide">
            <option v-if="showProvince" v-for="(province) in clientStore.provinces" :key="province" 
              @click="getDistricts(province.code, province.name)"
              class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            >
              {{ province.name }}
            </option>
  
            <option v-if="showDistrict" v-for="(district) in filterDistrict" :key="district" 
              @click="getWards(district.code, district.name)"
              class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            >
              {{ district.name }}
            </option>
  
            <option v-if="showWard" v-for="(ward) in filterWard" :key="ward"
              @click="clientStore.newSendWard = ' / ' + ward.name; clientStore.showNewSendAddress = false"
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
  
  let showProvince = ref<boolean>(true);
  let showDistrict = ref<boolean>(false);
  let showWard = ref<boolean>(false);
  
  let filterDistrict = ref<any>([]);
  let filterWard = ref<any>([]);
  
  const getDistricts = (code: any, name: string) => {
    clientStore.newSendProvince = name;
    clientStore.newSendDistrict = '';
    clientStore.newSendWard = '';
  
    showProvince.value = false;
    showWard.value = false;
  
    filterDistrict = clientStore.districts.filter((district: any) => {
      return district.province_code == code;
    });
    showDistrict.value = true;
    
  }
  
  const getWards = (code: any, name: string) => {
    clientStore.newSendDistrict = ' / ' + name;
    clientStore.newSendWard = '';
  
    showProvince.value = false;
    showDistrict.value = false;
    
    filterWard = clientStore.wards.filter((ward: any) => {
        return ward.district_code == code;
    })
  
    showWard.value = true;  
  }
  
  let province = computed(() => {
    return clientStore.newSendProvince ? clientStore.newSendProvince : '';
  })
  
  let district = computed(() => {
    return clientStore.newSendDistrict ? clientStore.newSendDistrict : '';
  })
  
  let newSendAddress = computed(() => {
    return clientStore.newSendProvince + clientStore.newSendDistrict + clientStore.newSendWard 
    ? clientStore.newSendProvince + clientStore.newSendDistrict + clientStore.newSendWard : '';
  })
  
  
  </script>