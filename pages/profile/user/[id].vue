<template>
  <MainLayout>
    <div class="w-full flex justify-center mt-6 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden scrollbar-hide">
      <button @click="router.back()" class="flex w-[50px]">
        <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
      </button>
      <div class="w-[500px] p-2 sm:p-6 rounded-xl h-fit shadow-lg border-[1px] ">
        <div class="text-center text-3xl font-bold ">Thông tin nhân viên</div>
        <div class="text-center text-gray-700 font-semibold">Mã nhân viên: {{ route.params.id }}</div>
        <div class="flex flex-col md:flex-row w-full md:space-x-10 mb-6 mt-6">
          <div class="w-full">
            <div class="w-full md:flex flex-col mb-2 text-gray-500">Email: {{ user?.email }}</div>
            <div class="w-full md:flex flex-col mb-2 text-gray-500">Địa chỉ: {{ user?.address }}</div>
            <div class="w-full md:flex flex-col mb-2 text-gray-500">Số điện thoại: {{ user?.phone }}</div>
            <div class="w-full md:flex flex-col mb-2 text-gray-500">Chức vụ: {{ user?.role }}</div>
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



let user = userStore.allEmployee?.find(us => {
  return us.id == route.params.id;
});

const router = useRouter();

</script>