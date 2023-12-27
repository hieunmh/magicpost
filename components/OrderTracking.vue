<template>
  <div class="w-[100vw] overflow-y-auto overflow-x-hidden h-[100vh] md:h-[calc(100vh-64px)] scrollbar-hide">
    <div class="flex justify-between items-center md:hidden h-16 border-b-[1px] shadow-lg">
      <NuxtLink to="/" class="pl-4 md:pl-0" @click="clientStore.isMenuOverlay = false">
        <h1 class="text-center font-bold text-[30px] text-[#189ab4]">
          <img src="/mgpost.png" width="100" alt="">
        </h1>
      </NuxtLink>
      <button class="md:hidden block pr-4" @click="clientStore.isMenuOverlay = true">
        <Icon name="ci:hamburger-md" size="40" class="text-gray-400" />
      </button>
    </div>

    <div class="w-full pt-6 flex items-center justify-center">
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
        <CalDeliveryFee />
      </div>
    </div>

    <Service />

    <Footer />
  </div>

</template>

<script lang="ts" setup>

const client = useSupabaseClient();

import { usePackageStore } from '~/store/package';
const packageStore = usePackageStore();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

let navigatorTab = ref<string>('follow');
let packageCode = ref<string>('');
let packageStt = ref<string | null | undefined>('');

let isLoading = ref<boolean>(false);

let { packageInfo } = storeToRefs(packageStore);

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