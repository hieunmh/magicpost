<template>
  <div class="pt-6 w-[100vw] overflow-y-auto overflow-x-hidden h-[calc(100vh-64px)] scrollbar-hide">
    <div class="w-full flex items-center justify-center">
      <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
        <div class="flex justify-between items-center">
          <button @click="navigatorTab = 'follow'" class="w-[50%]">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
              :class="navigatorTab == 'follow' ? ' text-[#189ab4]' : 'text-gray-500'"
            >
              Theo dõi đơn hàng
            </h1>
          </button>

          <button @click="navigatorTab = 'cost'" class="w-[50%]">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl  mb-4 text-center" 
              :class="navigatorTab == 'cost' ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Ước tính chi phí
            </h1>

          </button> 
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div class="w-[50%] px-8 absolute "
            :class="[
              {'left-0 transition-all duration-500': navigatorTab == 'follow' },
              {'left-[50%] transition-all duration-500': navigatorTab == 'cost' },
            ]"
          >
            <div class="h-[6px] bg-[#189ab4] w-full rounded-full" 
          />
          </div>
        </div>
      </div>
    </div>

    <div class="relative transition-all duration-500"
      :style="[{ 'height' : calHeight }]"
      :class="[
        {'mb-0 sm:mb-28': navigatorTab == 'follow' },
        {'mb-6 sm:mb-0': navigatorTab == 'cost' },
      ]"
    >
      <div class="absolute top-6 w-full px-4 sm:px-10 flex items-center justify-center"
        :class="[
          {'left-0 transition-all duration-500': navigatorTab == 'follow' },
          {'-left-[100vw] transition-all duration-500': navigatorTab == 'cost' },
        ]"
      >
        <div class="w-[1100px] rounded-xl flex flex-col pb-6">
          <form class="w-full flex h-14 sm:h-28 p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
            <input type="text" class="bg-gray-100 w-full h-10 sm:h-16 outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold text-gray-500"
              placeholder="Nhập mã đơn hàng" v-model="packageCode" @focus="errorSearch = ''; packageStore.showPackageInfo = false"
            >
            <button :disabled="packageCode.length == 0" @click.prevent="getPackageInfo()"
              class="bg-[#189ab4] hover:bg-[#189] w-28 sm:w-36 rounded-lg ml-2 
              sm:ml-6 text-white text-sm sm:text-xl font-semibold flex items-center justify-center text-center"
            >
              <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class="animate-spin"  />
              <p v-else>Theo dõi</p>
            </button>
          </form>
          <p v-if="!packageStore.showPackageInfo" class="mt-2 text-lg font-semibold text-red-500 text-center">{{ errorSearch }}</p>

          <div class="w-full bg-white rounded-xl mt-6 shadow-lg p-2 sm:p-6 border-[1px]"
          :class="[
            {'visible transition-all duration-500 opacity-100': packageStore.showPackageInfo },
            {'invisible transition-all duration-500 opacity-0': !packageStore.showPackageInfo },
          ]"
          >
            <div class="w-full text-gray-500 flex justify-between">
              <div class="flex items-center justify-center text-center">
                <p class="mr-2 text-lg sm:text-xl font-bold">Trạng thái: </p>
                <p class="text-green-500 bg-green-100 px-2 py-1 rounded-lg text-base sm:text-xl font-semibold">
                  {{ packageStt }}
                </p>
              </div>
              <button @click="packageStore.showPackageInfo = false">
                <Icon name="material-symbols:cancel-rounded" size="30" class="text-gray-300 hover:text-gray-400" />
              </button>
            </div>

            <div class="mt-4">
              <div class="flex font-semibold items-center">
                <div class="mr-2 text-center sm:text-base text-xs text-gray-400 w-[90px]">
                  <p>{{ new Date(String(packageInfo?.packageDetails?.created_at)).toLocaleDateString() }}</p>
                  <p>{{ new Date(String(packageInfo?.packageDetails?.created_at)).toLocaleTimeString('en-US', { hour12: false }) }}</p>
                </div>

                <div class="mx-1 flex flex-col items-center space-y-2">
                  <div class="h-4 w-[2px] bg-gray-300 invisible" />
                  <div>
                    <Icon name="octicon:dot-16" size="25" class="text-gray-300" />
                  </div>
                  <div class="h-4 w-[2px] bg-gray-300" />

                </div>

                <div class="text-gray-400 sm:text-base text-xs">
                  Đơn hàng đã được tạo
                </div>
              </div>
              <div v-for="(packageIf, index) in packageInfo?.packageStatus" :key="index"
                class="flex font-semibold items-center"
              >
                <div class="mr-2 text-center sm:text-base text-xs w-[90px]" 
                  :class="index + 1 == packageInfo?.packageStatus.length ? 'text-green-500' : 'text-gray-400'"
                >
                  <p>{{ new Date(packageIf.created_at).toLocaleDateString() }}</p>
                  <p>{{ new Date(packageIf.created_at).toLocaleTimeString('en-US', { hour12: false }) }}</p>
                </div>

                <div class="mx-1 flex flex-col items-center space-y-2">
                  <div class="h-4 w-[2px] bg-gray-300"/>

                  <div>
                    <Icon v-if="index + 1 == packageInfo?.packageStatus.length" 
                      name="octicon:dot-fill-24" size="25" class="text-green-500"
                    />
                    <Icon v-else name="octicon:dot-16" size="25" class="text-gray-300" />
                  </div>

                  <div class="h-4 w-[2px] bg-gray-300"
                    :class="index + 1 == packageInfo?.packageStatus.length ? 'invisible' : 'visible'"
                  />
                </div>

                <div class="text-gray-400 sm:text-base text-xs"
                  :class="index + 1 == packageInfo?.packageStatus.length ? 'text-green-500' : 'text-gray-400'"
                >
                  {{ packageIf.current_location }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="absolute top-6 w-full px-4 sm:px-10 flex items-center justify-center"
        :class="[
          {'-right-[100vw] transition-all duration-500': navigatorTab == 'follow' },
          {'right-0 transition-all duration-500': navigatorTab == 'cost' },     
        ]"
      >
        <div class="w-[1100px] sm:text-xl flex flex-col p-2 sm:p-6 rounded-xl sm:shadow-lg sm:border-[1px]">
          <div class="text-[#189ab4] mb-7 w-full text-lef font-semibold">Biểu phí dịch vụ </div>

          <div class="md:flex" >
            <div class="md:w-[50%] w-full">
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

    <Service />

    <Footer />
  </div>

</template>

<script lang="ts" setup>

const client = useSupabaseClient();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { usePackageStore } from '~/store/package';
const packageStore = usePackageStore();

let navigatorTab = ref<string>('follow');
let packageCode = ref<string>('');
let packageStt = ref<string | null | undefined>('');

let isLoading = ref<boolean>(false);

let { packageInfo } = storeToRefs(packageStore);

let isChecked = ref<boolean>(false);
let weight = ref<string>('0');

let errorSearch = ref<string>('');

let calHeight = computed(() => {
  if (navigatorTab.value == 'follow') {
    if (packageStore.showPackageInfo) {
      return `${Number(packageInfo?.value?.packageStatus.length)*75+280}px`
    } else {
      return '100px';
    }
  }

  if (navigatorTab.value == 'cost') {
    return '520px'
  }
})

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
  return clientStore.sendProvince + clientStore.sendDistrict + clientStore.sendWard && !clientStore.showSendAddress
  ? clientStore.sendProvince + clientStore.sendDistrict + clientStore.sendWard : '';
})

let receiveAddress = computed(() => {
  return clientStore.receiveProvince + clientStore.receiveDistrict + clientStore.receiveWard && !clientStore.showReceiveAddress
  ? clientStore.receiveProvince + clientStore.receiveDistrict + clientStore.receiveWard : '';
})

onMounted(() => {
  navigatorTab.value = 'follow';
})

const getPackageInfo = async () => {

  isLoading.value = true;
  const { data, error } = await useFetch(`/api/auth/getPackageByCode/${packageCode.value}`)
  if (!data.value) {
    isLoading.value = false;
    errorSearch.value = 'Không tìm thấy đơn hàng!'
    return;
  }
  
  packageInfo.value = data.value;
  packageStt.value = packageInfo.value?.packageStatus[packageInfo.value.packageStatus.length - 1].status;
  isLoading.value = false;

  packageStore.showPackageInfo = true;
  
  client.channel('update status').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'packageStatus',
      filter: `package_id=in.(${packageInfo.value?.packageStatus[packageInfo.value.packageStatus.length - 1].package_id})`,
    }, 

    async (payload: any) => {
      const { data, error } = await useFetch(`/api/auth/getPackageByCode/${packageCode.value}`)
      packageInfo.value = data.value;
      packageStt.value = packageInfo.value?.packageStatus[packageInfo.value.packageStatus.length - 1].status; 
    }
  ).subscribe()
}


</script>