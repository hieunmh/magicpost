<template>
  <div class="w-[80%] p-2 sm:p-6 rounded-xl shadow-lg border-[1px] mb-7">
    <div class="mb-7 w-full text-lef font-semibold">Thông tin người nhận</div>
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
          v-model="phoneReceiver"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
          maxlength="10"
          @blur="
            () => {
              if (phoneReceiver.length == 10) {
                phoneError = '';
                phoneReceiver = `(+84) ${phoneReceiver.substring(
                  1,
                  4
                )} ${phoneReceiver.substring(4, 7)} ${phoneReceiver.substring(
                  7,
                  10
                )}`;
              } else if (phoneReceiver.length == 0) {
                phoneTextError = 'Vui lòng không để trống';
              }
            }
          "
          @focus="
            () => {
              if (phoneReceiver.length == 17) {
                phoneReceiver =
                  '0' +
                  phoneReceiver.substring(6, 9) +
                  phoneReceiver.substring(10, 13) +
                  phoneReceiver.substring(14, 17);
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ phoneTextError }}
        </p>
      </div>
    </div>

    <div class="w-full md:flex mb-7">
      <div class="md:w-[50%] relative">
        <AddressReceive />

        <div class="font-semibold text-gray-500">
          Tỉnh/Quận-Huyện/Phường-Xã:
        </div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng chọn"
          @focus="
            clientStore.showSendAddress = false;
            clientStore.showReceiveAddress = true;
          "
          :value="receiveAddress"
          @blur="
            () => {
              if (receiveAddress.length < 1) {
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
  s
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

let phoneReceiver = ref<string>("");

let textInput = ref<string>("");
let addressTextInput = ref<string>("");

let textError = ref<string>("");
let phoneTextError = ref<string>("");
let addressError = ref<string>("");
let addressTextError = ref<string>("");

let receiveAddress = computed(() => {
  return clientStore.receiveProvince +
    clientStore.receiveDistrict +
    clientStore.receiveWard
    ? clientStore.receiveProvince +
        clientStore.receiveDistrict +
        clientStore.receiveWard
    : "";
});

let phoneError = ref<string>("");
</script>
