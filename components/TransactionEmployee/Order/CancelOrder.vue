<template>
  <div class="md:w-[1100px] w-full flex p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
    <div
      class="w-[1100px] mt-6 px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 md:gap-10 items-center justify-center"
    >
    <NuxtLink class="flex flex-col p-2 sm:p-6 rounded-xl shadow-lg border-[1px] text-gray-500 text-xs sm:text-sm md:text-lg font-semibold"
        v-for="p in packageStore.allCancelPackage" :key="p.id" :to="'/profile/transaction_point_head/package/' + p.id"
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
import { usePackageStore } from "~/store/package";

const packageStore = usePackageStore();


</script>
