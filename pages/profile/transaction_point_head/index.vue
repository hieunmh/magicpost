<template>
    <MainLayout>
      <div class="mt-6">
        <div class="w-full flex items-center justify-center">
          <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
            <div class="flex justify-between items-center">
              <button @click="navigatorTab = 'employee'" class="">
                <h1
                  class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
                  :class="
                    navigatorTab == 'employee'
                      ? ' text-[#189ab4]'
                      : 'text-gray-500'
                  "
                >
                  Quản lý nhân viên
                </h1>
              </button>
  
              <button @click="navigatorTab = 'package'" class="">
                <h1
                  class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
                  :class="
                    navigatorTab == 'package' ? 'text-[#189ab4]' : 'text-gray-500'
                  "
                >
                  Quản lý đơn hàng
                </h1>
              </button>
            </div>
  
            <div class="h-2 w-full bg-slate-60 relative">
              <div
                class="absolute h-[6px] bg-[#189ab4] w-[30px] sm:w-[50px] md:w-[100px] rounded-full"
                :class="[
                  {
                    'md:left-[20px] sm:left-[30px] left-[12px] transition-all duration-300':
                      navigatorTab == 'employee',
                  },
                  {
                    'md:left-[calc(100%-115px)] sm:left-[calc(100%-75px)] left-[calc(100%-45px)] transition-all duration-300':
                      navigatorTab == 'package',
                  },
                ]"
              />
            </div>
          </div>
        </div>
  
        <div
          class="absolute top-30 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
          :class="[
            { 'left-0 transition-all duration-300': navigatorTab == 'employee' },
            {
              '-left-[1500px] transition-all duration-300':
                navigatorTab == 'package',
            },
          ]"
        >
          <div class="w-[1100px] flex flex-col">
            <PointHeadTransactionEmployee/>
          </div>
        </div>
  
        <div
          class="absolute top-30 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
          :class="[
            {
              '-right-[1500px] transition-all duration-300':
                navigatorTab == 'employee',
            },
            { 'right-0 transition-all duration-300': navigatorTab == 'package' },
          ]"
        >
          <div class="w-[1100px] flex flex-col">
            <PointHeadOrder />
          </div>
        </div>
      </div>
    </MainLayout>
  </template>
  <script lang="ts" setup>
  import MainLayout from "~/layouts/MainLayout.vue";
  
  import { PackageType } from "~/types/packageType";
  import { UserType } from "~/types/userType";
  
  import { useUserStore } from "~/store/user";
  import { usePackageStore } from "~/store/package";
  const userStore = useUserStore();
  const packageStore = usePackageStore();
  
  import { useClientStore } from "~/store/client";
  
  const clientStore = useClientStore();
  
  let navigatorTab = ref<string>("employee");
  
  onMounted(() => {
    navigatorTab.value = "employee";
  });
  
  let headDetail = ref<UserType>({
    address: null,
    birthday: null,
    details: null,
    email: null,
    id: "",
    More_info: null,
    phone: null,
    role: null,
  });
  
  const showHeadDetail = (prop: UserType) => {
    headDetail.value = prop;
    clientStore.showHeadDetail = true;
  };
  
  let packages = ref<PackageType>({
    created_at: '',
    id: '',
    receiver_id: null,
    sender_id: null,
    sender_transaction_address: null,
    updated_at: null,
  });
  
  const showPackage = (prop: PackageType) => {
    packages.value = prop;
    clientStore.showPackage = true;
  };
  
  definePageMeta({ middleware: "loggedin" });
  </script>
  