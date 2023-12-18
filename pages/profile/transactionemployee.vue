<template>
  <MainLayout>
    <div
      class="relative h-[calc(100vh-64px)] overflow-y-scroll scroll-smooth w-full"
    >
      <div class="mt-6">
        <div class="w-full flex items-center justify-center">
          <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
            <div class="flex justify-between items-center">
              <button @click="navigatorTab = 'follow'" class="">
                <h1
                  class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
                  :class="
                    navigatorTab == 'follow'
                      ? ' text-[#189ab4]'
                      : 'text-gray-500'
                  "
                >
                  Tạo đơn hàng
                </h1>
              </button>

              <button @click="navigatorTab = 'cost'" class="">
                <h1
                  class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
                  :class="
                    navigatorTab == 'cost' ? 'text-[#189ab4]' : 'text-gray-500'
                  "
                >
                  Đơn hàng
                </h1>
              </button>
            </div>

            <div class="h-2 w-full bg-slate-60 relative">
              <div
                class="absolute h-[6px] bg-[#189ab4] w-[30px] sm:w-[50px] md:w-[100px] rounded-full"
                :class="[
                  {
                    'md:left-[px] sm:left-[30px] left-[12px] transition-all duration-300':
                      navigatorTab == 'follow',
                  },
                  {
                    'md:left-[calc(100%-115px)] sm:left-[calc(100%-75px)] left-[calc(100%-45px)] transition-all duration-300':
                      navigatorTab == 'cost',
                  },
                ]"
              />
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-center mt-6 w-full absolute"
          :class="[
            { 'left-0 transition-all duration-300': navigatorTab == 'follow' },
            {
              '-left-[1500px] transition-all duration-300':
                navigatorTab == 'cost',
            },
          ]"
        >
          <TransactionEmployeeOrderForm />
        </div>

        <div
          class="absolute top-20 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
          :class="[
            {
              '-right-[1800px] transition-all duration-300':
                navigatorTab == 'follow',
            },
            { 'right-0 transition-all duration-300': navigatorTab == 'cost' },
          ]"
        >
          <TransactionEmployeeAllOrder />
        </div>
      </div>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

let navigatorTab = ref<string>("follow");

let phoneSender = ref<string>("");
let phoneReceiver = ref<string>("");
let textInput = ref<string>("");

let phoneError = ref<string>("");
let inputError = ref<string>("");

onMounted(() => {
  navigatorTab.value = "follow";
});

let isChecked = ref<boolean>(false);
let weight = ref<string>("0");

const toggleChecked = () => {
  if (isChecked.value == false) {
    isChecked.value = true;
  } else {
    isChecked.value = false;
  }
};

watch(
  () => phoneSender.value,
  () => {
    if (phoneSender.value.startsWith("(+84)")) return;
    if (!phoneSender.value.startsWith("0")) {
      phoneError.value = "Số điện thoại phải bắt đầu bằng 0";
    } else if (phoneSender.value.length < 10 && phoneSender.value.length > 0) {
      phoneError.value = "Số điện thoại phải đủ 10 chữ số";
    } else {
      phoneError.value = "";
    }
  }
);

watch(
  () => phoneReceiver.value,
  () => {
    if (phoneReceiver.value.startsWith("(+84)")) return;
    if (!phoneReceiver.value.startsWith("0")) {
      phoneError.value = "Số điện thoại phải bắt đầu bằng 0";
    } else if (
      phoneReceiver.value.length < 10 &&
      phoneReceiver.value.length > 0
    ) {
      phoneError.value = "Số điện thoại phải đủ 10 chữ số";
    } else {
      phoneError.value = "";
    }
  }
);

watch(
  () => textInput.value,
  () => {
    if (textInput.value.length == 0) {
      inputError.value = "Vui lòng không để trống";
    }
  }
);
</script>
