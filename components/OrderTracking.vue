<template>
  <div class="mt-6 w-full h-full">
    <div class="w-full flex items-center justify-center">
      <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
        <div class="flex justify-between items-center">
          <button @click="navigatorTab = 'follow'" class="">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
              :class="navigatorTab == 'follow' ? ' text-[#189ab4]' : 'text-gray-500'"
            >
              Theo dõi đơn hàng
            </h1>
          </button>

          <button @click="navigatorTab = 'cost'" class="">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl  mb-4 text-center" 
              :class="navigatorTab == 'cost' ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Ước tính chi phí
            </h1>

          </button> 
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div class="absolute h-[6px] bg-[#189ab4] w-[30px] sm:w-[50px] md:w-[100px] rounded-full" 
            :class="[
              {'sm:left-[75px] left-[45px] transition-all duration-300': navigatorTab == 'follow' },
              {'md:left-[calc(100%-150px)] sm:left-[calc(100%-110px)] left-[calc(100%-65px)] transition-all duration-300': navigatorTab == 'cost' },
            ]"
          />
        </div>
      </div>
    </div>

    <div class="absolute top-20 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
      :class="[
        {'left-0 transition-all duration-300': navigatorTab == 'follow' },
        {'-left-[1500px] transition-all duration-300': navigatorTab == 'cost' },
      ]"
    >
      <div class="w-[1100px] flex h-14 sm:h-28 p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
        <input type="text"  class="bg-gray-100 w-full outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold text-gray-500"
          placeholder="Nhập mã đơn hàng"
        >
        <button class="bg-[#189ab4] w-28 sm:w-36 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold">
          Theo dõi
        </button>
      </div>
    </div>

    <div class="absolute top-20 w-full  mt-6 px-4 sm:px-10 flex items-center justify-center"
      :class="[
        {'-right-[1500px] transition-all duration-300': navigatorTab == 'follow' },
        {'right-0 transition-all duration-300': navigatorTab == 'cost' },     
      ]"
    >
      <div class="w-[1100px] sm:text-xl flex flex-col p-2 sm:p-6 rounded-xl sm:shadow-lg sm:border-[1px]">
        <div class="text-[#189ab4] mb-7 w-full text-lef font-semibold">Biểu phí dịch vụ </div>

        <div class="md:flex" >
          <div class="md:w-[50%] w-full relative">
            <AddressSend />

            <div class="font-semibold text-gray-500">Địa chỉ lấy hàng: </div>

            <input type="text" class="bg-gray-100 mt-2 w-full font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
              placeholder="Vui lòng chọn"  @focus="clientStore.showSendAddress = true; clientStore.showReceiveAddress = false"
              :value="sendAddress"
            >
          </div>

          <div class="md:w-6 w-0" />

          <div class="md:w-[50%] w-full relative">
            <AddressReceive />

            <div class="font-semibold text-gray-500">Địa chỉ người nhận: </div>

            <input type="text" class="bg-gray-100 mt-2 w-full font-semibold h-12 rounded-lg outline-none pl-4 text-sm text-gray-500"
              placeholder="Vui lòng chọn" @focus="clientStore.showReceiveAddress = true; clientStore.showSendAddress = false"
              :value="receiveAddress"
            >
          </div>
        </div>

        <div class="md:flex md:mt-5 mt-1">
          <div class="md:w-[50%] w-full">
            <div class="hidden md:block">
              <div class="w-full font-semibold text-gray-500">Tổng khối lượng: </div>   
              <div class="w-full mt-2 relative">
                <div class="rounded-lg flex items-center bg-gray-100 md:w-full">
                  <input type="text" placeholder="Vui lòng nhập thông tin" maxlength=""
                    class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl font-semibold text-gray-500"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '')" :value="weight" @blur="(e) => weight = (e.target as any).value"
                  >
                  <span class="text-gray-400 bg-gray-100 px-2 font-semibold border-l-2 rounded-r-lg text-xs sm:text-lg">
                    KG
                  </span>
                </div>
                <div v-if="isChecked" class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full" />
              </div> 
            </div>

            <div class="flex w-full items-center h-16 md:hidden">
              <div class="w-2/5 font-semibold text-gray-500">Khối lượng: (KG)</div> 

              <div class="w-3/5 relative flex">
                <button class="bg-gray-100 px-3 sm:px-6 rounded-l-lg flex items-center border-r-2" @click="decreaseWeight()">
                  <Icon name="ic:sharp-minus" size="30" color="#189ab4" />
                </button>

                <div class="rounded-lg flex items-center bg-gray-100 md:w-full">
                  <input type="text" :disabled="isChecked" :value="weight" maxlength=""
                    class="bg-gray-100 w-full h-12 outline-none text-lg sm:text-xl font-semibold text-gray-500 text-center"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '')"  @blur="(e) => weight = (e.target as any).value"
                  >
                </div>

                <button class="bg-gray-100 px-3 sm:px-6 rounded-r-lg   flex items-center border-l-2" @click="increaseWeight()">
                  <Icon name="ic:sharp-plus" size="30" color ="#189ab4" />
                </button>

                <div v-if="isChecked" class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full" />
              </div>
              
            </div>
          </div>

          <div class="md:w-6 w-0" />

          <div class="md:w-[50%] w-full">
            <div class="md:w-full font-semibold text-gray-500">Kích thước đơn hàng: </div>

            <div class="flex md:w-full mt-2 justify-between">
              <div class="w-[31%] relative">
                <div class="w-full rounded-lg bg-gray-100 flex items-center">
                  <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" 
                    class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl text-gray-500 font-semibold"
                    :class="[{ 'cursor-not-allowed': isChecked }]" :disabled="isChecked" placeholder="Dài"
                  >
                  <span class="text-gray-400 bg-gray-100 px-2 border-l-2 rounded-r-lg text-xs sm:text-lg font-semibold">
                    CM
                  </span>
                </div>
                <div v-if="isChecked" class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full" />
              </div>

              <div class="w-[31%] relative">
                <div class="w-full rounded-lg bg-gray-100 flex items-center">
                  <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" 
                    class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl text-gray-500 font-semibold"
                    :class="[{ 'cursor-not-allowed': isChecked }]" :disabled="isChecked" placeholder="Rộng"
                  >
                  <span class="text-gray-400 bg-gray-100 px-2 border-l-2 rounded-r-lg text-xs sm:text-lg font-semibold">
                    CM
                  </span>
                </div>
                <div v-if="isChecked" class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full" />
              </div>

              <div class="w-[31%] relative">
                <div class="w-full rounded-lg bg-gray-100 flex items-center">
                  <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" 
                    class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl text-gray-500 font-semibold"
                    :class="[{ 'cursor-not-allowed': isChecked }]" :disabled="isChecked" placeholder="Cao"
                  >
                  <span class="text-gray-400 bg-gray-100 px-2 border-l-2 rounded-r-lg text-xs sm:text-lg font-semibold">
                    CM
                  </span>
                </div>
                <div v-if="isChecked" class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 text-justify flex items-center justify-center md:justify-start">
          <Icon v-if="isChecked" name="material-symbols:check-circle-rounded" 
            color="#189ab4" size="" @click="toggleChecked()" class="text-[24px]"
          />
          <span v-else @click="toggleChecked()"
            class="w-[24px] h-[24px] flex items-center justify-center" 
          >
            <span class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"></span>
          </span>  
          <p class="ml-2 sm:text-lg text-[13px] font-semibold text-gray-500 cursor-pointer">Tôi không biết cân nặng chính xác của bưu kiện </p>
        </div>

        <button class="bg-[#189ab4] h-10 w-full md:w-fit px-6 rounded-lg text-white text-sm sm:text-xl font-semibold mt-7">
          Tính phí giao hàng 
        </button> 
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

let navigatorTab = ref<string>('follow');

let isChecked = ref<boolean>(false);
let weight = ref<string>('0');

const toggleChecked = () => {
  if (isChecked.value == false) {
    isChecked.value = true;
  }
  else {
    isChecked.value = false;
  }
}

const increaseWeight = () => {
  if (weight.value) {
    weight.value = String(Number(weight.value) + 0.5)
  }
}

const decreaseWeight = () => {
  if (Number(weight.value) <= 0) {
    weight.value = '0';
    return;
  }
  if (weight.value) { 
    weight.value = String(Number(weight.value) - 0.5)
  }
}


let sendAddress = computed(() => {
  return clientStore.sendProvince + clientStore.sendDistrict + clientStore.sendWard 
  ? clientStore.sendProvince + clientStore.sendDistrict + clientStore.sendWard : '';
})

let receiveAddress = computed(() => {
  return clientStore.receiveProvince + clientStore.receiveDistrict + clientStore.receiveWard 
  ? clientStore.receiveProvince + clientStore.receiveDistrict + clientStore.receiveWard : '';
})

onMounted(() => {
  navigatorTab.value = 'follow';
})


</script>