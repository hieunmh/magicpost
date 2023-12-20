<template>
  <div class="w-[1100px] flex p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
    <div
      class="w-[1100px] mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center"
    >
      <div
        class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
        v-for="p in packageStore.allWaitPackage"
        @click="showPackage(p)"
      >
        <div class="grid grid-cols-12 items-center text-center">
          <div class="col-span-4">ID:</div>
          <div class="col-span-8">{{ p.id.substring(0, 15) }}...</div>
        </div>
      </div>
    </div>
  </div>
  <Packages
    :Packages="packages"
    :class="[
      {
        'visible transition-all duration-500 bg-black bg-opacity-50 opacity-100':
          clientStore.showPackage,
      },
      {
        'invisible transition-all duration-500 bg-black bg-opacity-50 opacity-0':
          !clientStore.showPackage,
      },
    ]"
  />
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
