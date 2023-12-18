<template>
  <div class="top-40">
    <div class="flex justify-between md:text-lg sm:text-sm text-xs">
      <button class="w-1/3" @click="clientStore.ceonavigatorTab = 'system'">
        <h1
          class="font-semibold mb-4 text-center"
          :class="
            clientStore.ceonavigatorTab == 'system'
              ? 'text-[#189ab4]'
              : 'text-gray-500'
          "
        >
          Quản lý hệ thống
        </h1>
      </button>

      <button
        class="w-1/3"
        @click="clientStore.ceonavigatorTab = 'account'"
        :class="
          clientStore.ceonavigatorTab == 'account'
            ? 'text-[#189ab4]'
            : 'text-gray-500'
        "
      >
        <h1 class="font-semibold mb-4 text-center">Quản lý tài khoản</h1>
      </button>

      <button
        class="w-1/3"
        @click="clientStore.ceonavigatorTab = 'statistical'"
        :class="
          clientStore.ceonavigatorTab == 'statistical'
            ? 'text-[#189ab4]'
            : 'text-gray-500'
        "
      >
        <h1 class="font-semibold mb-4 text-center">Thống kê hàng gửi</h1>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();
</script>
