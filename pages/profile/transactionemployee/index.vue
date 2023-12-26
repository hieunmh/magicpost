<template>
  <MainLayout>
    <div class="w-full flex items-center justify-center mt-6">
      <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
        <div class="flex justify-between items-center">
          <button @click="navigatorTab = 'OrderForm'" class="w-[50%]">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
              :class="navigatorTab == 'OrderForm' ? ' text-[#189ab4]' : 'text-gray-500'"
            >
              Tạo đơn hàng
            </h1>
          </button>

          <button @click="navigatorTab = 'Order'" class="w-[50%]">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl  mb-4 text-center" 
              :class="navigatorTab == 'Order' ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Đơn hàng
            </h1>

          </button> 
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div class="w-[50%] px-8 absolute "
            :class="[
              {'left-0 transition-all duration-500': navigatorTab == 'OrderForm' },
              {'left-[50%] transition-all duration-500': navigatorTab == 'Order' },
            ]"
          >
            <div class="h-[6px] bg-[#189ab4] w-full rounded-full" 
          />
          </div>
        </div>
      </div>
    </div>

    <div class="h-[calc(100vh-160px)] w-full overflow-y-auto overflow-x-hidden scrollbar-hide relative">
      <div class="absolute top-6 w-full px-4 sm:px-10 flex items-center justify-center"
        :class="[
          { 'left-0 transition-all duration-500': navigatorTab == 'OrderForm' },
          { '-left-[500vw] transition-all duration-500': navigatorTab == 'Order' },
        ]"
      > 
      <form class="w-[1100px] mt-10 items-center justify-center" @submit.prevent="Create()">
        <div class="w-full">
          <div class="flex flex-col w-full rounded-xl shadow-lg mb-6 border-[1px] p-6">
            <div class="flex flex-col md:flex-row w-full md:space-x-10 mb-6">
              <TransactionEmployeeFormOrderSender class="w-full" />
              <TransactionEmployeeFormOrderReceiver class="w-full" />
            </div>

            <div class="flex flex-col w-full">
              <TransactionEmployeeFormOrder class="w-full" />
              <TransactionEmployeeFormOrderCost class="w-full" />

              <button @click="print()" class="bg-[#189ab4] h-10 w-full md:w-fit px-6 rounded-lg text-white text-sm sm:text-xl font-semibold mt-6 mb-10">
                Tạo đơn
              </button>
            </div>
          </div>
        </div>  
      </form>
        
      </div>

      <div class=" absolute w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
        :class="[
          { '-right-[500vw] transition-all duration-500': navigatorTab == 'OrderForm' },
          { 'right-0 transition-all duration-500': navigatorTab == 'Order' },
        ]"
      >
        <div class="w-[1100px] flex flex-col">
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

let navigatorTab = ref<string>("OrderForm");

let phoneSender = ref<string>("");
let phoneReceiver = ref<string>("");
let textInput = ref<string>("");

let phoneError = ref<string>("");
let inputError = ref<string>("");

let isLoading = ref<boolean>(false);

onMounted(() => {
  navigatorTab.value = "OrderForm";
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

watch(() => phoneSender.value, () => {
  if (phoneSender.value.startsWith("(+84)")) return;

  if (!phoneSender.value.startsWith("0")) {
    phoneError.value = "Số điện thoại phải bắt đầu bằng 0";
  } else if (phoneSender.value.length < 10 && phoneSender.value.length > 0) {
    phoneError.value = "Số điện thoại phải đủ 10 chữ số";
  } else {
    phoneError.value = "";
  }
});

watch(() => phoneReceiver.value, () => {
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
} );

watch(() => textInput.value,() => {
  if (textInput.value.length == 0) {
    inputError.value = "Vui lòng không để trống";
  }
});

const print = () => {
  window.print()
}

const Create = () => {
  isLoading.value = true;
}

</script>
