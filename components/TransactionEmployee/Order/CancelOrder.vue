<template>
  <div class="md:w-[1100px] w-full flex p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
    <div
      class="w-[1100px] mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center"
    >
    <NuxtLink class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
        v-for="p in packageStore.allSendPackage" :key="p.id" :to="'/profile/transaction_point_head/package/' + p.id"
      >
        <div class="flex h-8 items-center">
          <Icon name="carbon:location-filled" class="text-[25px] mr-1" />
          <div class="text-lg">{{ p.id }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
import { PackageType } from "~/types/packageType";
import { usePackageStore } from "~/store/package";

const packageStore = usePackageStore();
const clientStore = useClientStore();

let packages = ref<PackageType>({
  created_at: "",
  id: "",
  receiver_id: null,
  sender_id: null,
  updated_at: null,
  sender_transaction_address: null,
});

const showPackage = (prop: PackageType) => {
  packages.value = prop;
  clientStore.showPackage = true;
};
</script>
