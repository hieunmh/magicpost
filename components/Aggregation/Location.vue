<template>
  <div class="w-full h-full fixed px-4 sm:px-0 top-0 left-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    :class="aggregationStore.showNextLocation ? 'visible opacity-100 transition-all duration-300 ease-in' 
    : 'invisible opacity-0 transition-all duration-300 ease-in'"
    @click.self="aggregationStore.showNextLocation = false; nextLocation = ''"
  >
    <div class="w-[500px] h-[400px] px-4 bg-white rounded-xl shadow-xl z-40 border-[1px]"> 
      <div class="w-full mt-4">
        <input type="text" class="bg-gray-200 text-gray-500 outline-none text-sm w-full py-2 px-6 rounded-lg font-semibold"
          :value="nextLocation" placeholder="Chọn điểm chuyển tiếp"
        >
      </div>
      <div class="border-[1.5px] rounded-lg mt-[18px]">
        <div class="w-full h-[250px] overflow-y-scroll text-sm scrollbar-hide">
          <option class="cursor-pointer h-10 font-bold text-base text-gray-600 hover:bg-gray-100 flex items-center pl-6">
            Điểm tập kết
          </option>

          <option value="" v-for="agg in aggregationStore.allAggregationPoint"
            @click="nextLocation = agg.address"
            class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            :class="agg.id == aggregationStore.aggregationId ? 'hidden': 'block'"
          >
            <p>{{ agg.address }}</p>
          </option>

          <option value=""
          class="cursor-pointer h-10 font-bold text-gray-600 text-base hover:bg-gray-100 ] flex items-center pl-6"
          >
            Điểm giao dịch
          </option>

          <option value="" v-for="tran in filtertranSaction"
            @click="nextLocation = tran.address"
            class="cursor-pointer h-10 font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#189ab4] flex items-center pl-6"
            :class="tran.address == pkInfo?.packageDetails.sender_address ? 'hidden': 'block'"
          >
            {{ tran.address }}
          </option>
          
        </div>        
      </div>

      <div class="w-full mt-4">
        <button @click="movetoOtherLocation(pkInfo, nextLocation)"
          class="bg-[#189ab4] font-semibold text-white h-10 w-full rounded-lg flex items-center justify-center">
          <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class="animate-spin"  />
          <p v-else>Xác nhận</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();

import { useTransactionStore } from '~/store/transaction';
const transactionStore = useTransactionStore();

import { PackageType } from "~/types/packageType";
import { PackageStatusType } from "~/types/packageStatusType";
import { PackageDetailType } from "~/types/packageDetailType";

const props = defineProps<{ pkInfo: PackageType & { packageStatus: PackageStatusType[], packageDetails: PackageDetailType } | undefined }>();

const { pkInfo } = toRefs(props)


const filtertranSaction = computed(() => {
  return transactionStore.allTransactionPoint?.filter(tran => {
    return tran.aggregation_id == aggregationStore.aggregationId;
  })
})

const nextLocation = ref<string>('');
let isLoading = ref<boolean>(false);

const movetoOtherLocation = async (p: PackageType & { packageStatus: PackageStatusType[], packageDetails: PackageDetailType } | undefined, location: string) => {
  isLoading.value = true;
  const data = await useFetch('/api/auth/Aggregation/movePackageToOtherLocation', {
    method: 'post',
    body: {
      address: location,
      packageId: p?.id,
      packageStatusId: p?.packageStatus[0].id,
    }
  })

  const allSentPk = await useFetch('/api/auth/Aggregation/getAllSentPackagesInAggregation');
  aggregationStore.allSentPackage = allSentPk.data.value;

  const res = await useFetch('/api/auth/Aggregation/getAllNewPackagesInAggregation');
  aggregationStore.allNewPackage = res.data.value;

  aggregationStore.showNextLocation = false;
}


</script>