<template>
  <div class="w-[80%] p-2 sm:p-6 rounded-xl shadow-lg border-[1px] mb-7">
    <div class="mb-7 w-full text-left font-semibold">Thông tin người gửi</div>
    <div class="w-full md:flex mb-7">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Họ và tên:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
          v-model="textInput"
          @blur="
            () => {
              if (textInput.length < 1) {
                textError = 'Vui lòng không để trống ';
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ textError }}
        </p>
      </div>

      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Số điện thoại:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
          v-model="phoneSender"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
          maxlength="10"
          @blur="
            () => {
              if (phoneSender.length == 10) {
                phoneError = '';
                phoneSender = `(+84) ${phoneSender.substring(
                  1,
                  4
                )} ${phoneSender.substring(4, 7)} ${phoneSender.substring(
                  7,
                  10
                )}`;
              } else if (phoneSender.length == 0) {
                phoneTextError = 'Vui lòng không để trống';
              }
            }
          "
          @focus="
            () => {
              if (phoneSender.length == 17) {
                phoneSender =
                  '0' +
                  phoneSender.substring(6, 9) +
                  phoneSender.substring(10, 13) +
                  phoneSender.substring(14, 17);
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ textError }}
        </p>
      </div>
    </div>

    <div class="w-full md:flex mb-7">
      <div class="md:w-[50%] relative">
        <AddressSend />

        <div class="font-semibold text-gray-500">
          Tỉnh/Quận-Huyện/Phường-Xã:
        </div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng chọn"
          @focus="
            clientStore.showSendAddress = true;
            clientStore.showReceiveAddress = false;
          "
          :value="sendAddress"
          @blur="
            () => {
              if (sendAddress.length < 1) {
                addressTextError = 'Vui lòng không để trống ';
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ addressTextError }}
        </p>
      </div>

      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Mã bưu chính:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
        />
      </div>
    </div>

    <div class="w-full md:flex">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Địa chỉ:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
          v-model="textInput"
          @blur="
            () => {
              if (addressTextInput.length < 1) {
                addressError = 'Vui lòng không để trống ';
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ addressError }}
        </p>
      </div>

      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Ghi chú:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder=""
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

watch(
  () => textInput.value,
  () => {
    if (textInput.value.length == 0) {
      textError.value = "Vui lòng không để trống";
    }
  }
);
</script>
