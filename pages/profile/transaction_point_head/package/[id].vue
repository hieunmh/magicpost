<template>
  <MainLayout>
    <div class="w-full flex justify-center mt-6 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-hide">
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
      </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { usePackageStore } from '~/store/package';
const route = useRoute();
const packageStore = usePackageStore();

console.log(packageStore.allPackage);


let pack = packageStore.allPackage?.find(pk => {
  return pk.id == route.params.id;
});

</script>