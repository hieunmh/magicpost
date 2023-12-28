<template>
  <MainLayout>
    <div class="w-full flex justify-center mt-6 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div class="md:w-[900px] w-[95%] p-2 sm:p-6 rounded-xl h-fit shadow-lg border-[1px] ">
        <div class="text-center text-3xl font-bold">Thông tin nhân viên</div>
        <div class="text-center">Mã nhân viên: {{ route.params.id }}</div>
        <div class="flex flex-col md:flex-row w-full md:space-x-10 mb-6 mt-4">
          <div class="w-full">
            <div class="w-full md:flex flex-col mb-1">Email: {{ user?.email }}</div>
            <div class="w-full md:flex flex-col mb-1">Địa chỉ: {{ user?.address }}</div>
            <div class="w-full md:flex flex-col mb-1">Số điện thoại: {{ user?.phone }}</div>
            <div class="w-full md:flex flex-col mb-1">Chức vụ: {{ user?.role }}</div>
          </div>
        </div>
        <button @click="" class="bg-[#189ab4] h-10 w-full md:w-fit px-6 rounded-lg text-white text-sm sm:text-xl font-semibold mt-6 mb-10">
          Xóa tài khoản
        </button>
      </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/store/user';
const route = useRoute();
const userStore = useUserStore();

console.log(userStore.allTransactionEmployee);

let user = userStore.allTransactionEmployee?.find(us => {
  return us.id == route.params.id;
});

</script>