<template>
    <div class="w-full h-full fixed z-50 top-[0] flex items-center justify-center bg-black bg-opacity-50"
      @click.self="clientStore.showPackage = false"
    >
      <div class="w-[500px] h-[500px] bg-white rounded-xl font-semibold text-2xl" 
      >
        {{ Packages }}
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { PackageType } from '~/types/packageType';
  import { useClientStore } from '~/store/client';
  const clientStore = useClientStore();
  
  const props = defineProps<{ Packages: PackageType }>();
  
  const { Packages } = toRefs(props);
  
  </script>
  