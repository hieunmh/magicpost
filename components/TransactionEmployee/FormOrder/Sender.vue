<template>
  <div class="">
    <div class="mb-6 w-full text-left text-lg text-[#189ab4] font-semibold">1. Thông tin người gửi</div>

    <div class="w-full md:flex flex-col mb-4 h-20">
      <div class="w-full">
        <div class="font-semibold text-gray-500 flex text-center items-center">Họ và tên:</div>
        <input type="text" v-model="textInput" placeholder="Vui lòng nhập thông tin"
          class="font-semibold outline-none w-full py-2 text-sm text-gray-500 border-b-[1.5px]"
          @blur="() => {
            if (textInput.length < 1) {
              textError = 'Vui lòng không để trống ';
            }
          }"
        />
      </div>

      <p class="text-red-500 font-semibold mt-1 text-[14px]">
        {{ textError }}
      </p>
    </div>

    <div class="w-full flex flex-col mb-4">
      <div class="w-full h-20 mb-4">
        <AddressSend />

        <div class="font-semibold text-gray-500">Tỉnh / Quận-Huyện / Phường-Xã:</div>  

        <input type="text" class="w-full py-2 border-b-[1px] font-semibold outline-none text-sm text-gray-500"
          placeholder="Vui lòng chọn"
          @focus="clientStore.showSendAddress = true; clientStore.showReceiveAddress = false"
          :value="sendAddress"
          @blur="() => {
            if (sendAddress.length < 1) {
              addressTextError = 'Vui lòng không để trống ';
            }
          }"
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ addressTextError }}
        </p>
      </div>

      <div class="w-full h-20">
        <div class="font-semibold text-gray-500">Địa chỉ cụ thể:</div>
        <input type="text" class="w-full font-semibold py-2 outline-none text-sm text-gray-500 border-b-[1px]"
          placeholder="Vui lòng nhập thông tin"
          @blur="
            () => {
              if (addressTextInput.length < 1) {
                addressError = 'Vui lòng không để trống ';
              }
              else {
                addressError = '';
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ addressError }}
        </p>
      </div>
    </div>

    <div class="w-full flex space-x-4 h-20">
      <div class="w-[50%]">
        <div class="font-semibold text-gray-500">Số điện thoại:</div>
        <input type="text" v-model="phoneSender" maxlength="10"
          class="w-full font-semibold outline-none border-b-[1px] py-2 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
          @blur="() => {
            if (phoneSender.length == 10) {
              phoneError = '';
              phoneSender = `(+84) ${phoneSender.substring(1, 4)} ${phoneSender.substring(4, 7)} ${phoneSender.substring(7, 10)}`;
            } else if (phoneSender.length == 0) {
              phoneTextError = 'Vui lòng không để trống';
            }
          }"

          @focus="() => {
            if (phoneSender.length == 17) {
              phoneSender = '0' + phoneSender.substring(6, 9) + phoneSender.substring(10, 13) + phoneSender.substring(14, 17);
            }
          }"
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ textError }}
        </p>
      </div>

      <div class="w-[50%]">
        <div class="font-semibold text-gray-500">Mã bưu chính:</div>
        <input type="text" placeholder="Vui lòng nhập thông tin"
          class="w-full font-semibold outline-none py-2 text-sm border-b-[1px] text-gray-500"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

let phoneSender = ref<string>("");

let textInput = ref<string>("");
let addressTextInput = ref<string>("");

let textError = ref<string>("");
let phoneTextError = ref<string>("");
let addressError = ref<string>("");
let addressTextError = ref<string>("");

let phoneError = ref<string>("");

let sendAddress = computed(() => {
  return clientStore.sendProvince +
    clientStore.sendDistrict +
    clientStore.sendWard
    ? clientStore.sendProvince + clientStore.sendDistrict + clientStore.sendWard
    : "";
});

watch(() => textInput.value, () => {
  if (textInput.value.length == 0) {
    textError.value = "Vui lòng không để trống";
  }
  else {
    textError.value = "";
  }
});

</script>
