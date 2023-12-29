<template>
  <MainLayout>
    <div class="w-full flex justify-center mt-6 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-hide">
      <button @click="router.back()" class="flex w-[50px]">
        <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
      </button>
      <div class="md:w-[900px] w-[95%] p-2 sm:p-6 rounded-xl h-fit shadow-lg border-[1px] ">
        <div class="text-center text-3xl font-bold">Thông tin đơn hàng</div>
        <div class="text-center">Mã đơn hàng: {{ route.params.id }}</div>
        <div class="flex flex-col md:flex-row w-full md:space-x-10 mb-6 mt-4">
        <div class="w-[50%]">
          <div class="mb-6 w-full text-left text-lg text-[#189ab4] font-semibold">1. Thông tin người gửi</div>
          <div class="w-full md:flex flex-col mb-1">Họ và tên: {{ pack?.packageDetails.sender_name }}</div>
          <div class="w-full md:flex flex-col mb-1">Địa chỉ: {{ pack?.sender_transaction_address }}</div>
          <div class="w-full md:flex flex-col mb-1">Số điện thoại: {{ pack?.packageDetails.sender_phone_no }}</div>
        </div>
        <div class="w-[50%]">
          <div class="mb-6 w-full text-left text-lg text-[#189ab4] font-semibold">2. Thông tin người nhận</div>
          <div class="w-full md:flex flex-col mb-1">Họ và tên: {{ pack?.packageDetails.receiver_name }}</div>
          <div class="w-full md:flex flex-col mb-1">Địa chỉ: {{ pack?.packageDetails.receiver_address }}</div>
          <div class="w-full md:flex flex-col mb-1">Số điện thoại: {{ pack?.packageDetails.receiver_phone_no }}</div>
        </div>
      </div>
        <div class="mb-2 w-full text-left text-lg text-[#189ab4] font-semibold">3. Thông tin đơn hàng</div>
        <div class="w-full md:flex flex-col mb-1">Loại hàng: {{ pack?.packageDetails.package_info }}</div>
        <div class="w-full md:flex flex-col mb-1">Trạng thái: {{ pack?.packageStatus[0].status }}</div>
        <div v-if="pack?.packageStatus[0].isPassed == false && pack?.packageStatus[0].current_location == transactionStore.tranAddress?.address" class="">
          <div>
            <div>Loại hình gửi hàng</div>
            <div class="flex items-center justify-center md:justify-start">
              <Icon
                v-if="!toReceiver"
                name="material-symbols:check-circle-rounded"
                color="#189ab4"
                size="24"
                @click="isInAgg()"
                class="text-[12px]"
                />
                <span
                  v-else
                  @click="isInAgg()"
                  class="w-[24px] h-[24px] flex items-center justify-center"
                >
                  <span
                    class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
                  ></span>
                </span>
                <p class="ml-2 font-semibold text-gray-500 cursor-pointer mr-4">
                  Gửi đến điểm tập kết
                </p>

                <Icon
                  v-if="toReceiver"
                  name="material-symbols:check-circle-rounded"
                  color="#189ab4"
                  size="24"
                  @click="isInAgg()"
                  class="text-[12px]"
                />
                <span
                  v-else
                  @click="isInAgg()"
                  class="w-[24px] h-[24px] flex items-center justify-center"
                >
                  <span
                    class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
                  ></span>
                </span>
                <p class="ml-2 font-semibold text-gray-500 cursor-pointer">Gửi đến người nhận</p>
              </div>
              
              <div v-if="!toReceiver" class="">
                <div class="flex mr-2"> Lựa chọn điểm tập kết: </div>
                <div class="mt-2">
                  <input type="text" class="bg-gray-100 w-[500px] h-8 outline-none rounded-lg mr-2 pl-4 text-sm font-semibold text-gray-500"
                  placeholder="Vui lòng chọn"
                  @focus="clientStore.showAggLocation = true"
                  :value="agg?.address"
                  />
                </div>
                <div class="text-red-500 font-semibold ml-2 text-[14px]">
                  {{ aggError }}
                </div>
              </div>
              <div class="mt-5">
                <NuxtLink @click="confirm()" :to="'/profile/transactionemployee'" class="bg-[#189ab4] h-10 w-full md:w-fit px-6 rounded-lg text-white text-sm sm:text-xl font-semibold mt-6 mb-10">
                  Xác nhận
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { usePackageStore } from '~/store/package';
import { useClientStore } from '~/store/client';
import { useAggregationStore } from '~/store/aggregation';
import { useUserStore } from '~/store/user';
import { useTransactionStore } from '~/store/transaction';

const aggregationStore = useAggregationStore();
const clientStore = useClientStore();
const userStore = useUserStore();
const transactionStore = useTransactionStore();

console.log(transactionStore.tranAddress);


let isLoading = ref<boolean>(false);
let toReceiver = ref<boolean>(false);

const agg = computed(() => {
  return aggregationStore.allAggregationPoint?.find(aggId => {
    return aggId.id == clientStore.aggregations.aggregation_id;
  }) 
})

const route = useRoute();
const packageStore = usePackageStore();
let aggError = ref<string>("");

let pack = packageStore.allPackage?.find(pk => {
  return pk.id == route.params.id;
});


const router = useRouter();
let temp = ref<any>("");

watch(() => agg.value, () => {
  if(agg.value?.address.length != 0) {
    aggError.value = '';
    temp.value = pack?.packageDetails.receiver_address;
  } else {
    temp.value = agg.value.address;
  }
})

const isInAgg = () => {
  if (toReceiver.value == false) {
    toReceiver.value = true;
  } else {
    toReceiver.value = false;
  } 
};

const confirm = async () => {
  const {data, error} = await useFetch('/api/auth/Transaction/movePackageFromT2Receiver', {
    method:'post',
    body: {
      packageStatusId : pack?.packageStatus[0].id,
      address : agg.value?.address,
      packageId : pack?.id,
    }
  });
  if (error && error.value?.message) {
    isLoading.value = false;
  }

  else {    
    const res = await useFetch('/api/auth/Packages/getAllPackagesInfo');
    packageStore.allPackage = res.data.value;
    isLoading.value = false;
  }
  
}

</script>