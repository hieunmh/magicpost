<template>
  <div class="">
    <div class="mb-6 w-full text-left text-lg text-[#189ab4] font-semibold">2. Thông tin người nhận</div>

    <div class="w-full md:flex flex-col mb-4 h-20">
      <div class="w-full ">
        <div class="font-semibold text-gray-500 flex text-center items-center">Họ và tên:</div>
        <input type="text" v-model="nameInput" placeholder="Vui lòng nhập thông tin"
          class="font-semibold outline-none w-full py-2 text-sm text-gray-500 border-b-[1.5px]"
          @blur="() => {
            if (nameInput.length < 1) {
              nameTextError = 'Vui lòng không để trống ';
            }
          }"
        />
      </div>

      <p class="text-red-500 font-semibold mt-1 text-[14px]">
        {{ nameTextError }}
      </p>
    </div>

    <div class="w-full flex flex-col mb-4">
      <div class="w-full h-20 mb-4">
        <AddressNewReceive />

          <div class="font-semibold text-gray-500">Tỉnh / Quận-Huyện / Phường-Xã:</div>  

          <input type="text" class="w-full py-2 border-b-[1px] font-semibold outline-none text-sm text-gray-500"
            placeholder="Vui lòng chọn"
            @focus="clientStore.showNewSendAddress = false; clientStore.showNewReceiveAddress = true"
            :value="newReceiveAddress"
            @blur="() => {
              if (newReceiveAddress.length < 1) {
                addressError = 'Vui lòng không để trống ';
              }
            }"
          />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ addressError }}
        </p>
      </div>

      <div class="w-full h-20">
        <div class="w-full ">
        <div class="font-semibold text-gray-500 flex text-center items-center">Địa chỉ cụ thể:</div>
        <input type="text" v-model="addressTextInput" placeholder="Vui lòng nhập thông tin"
          class="font-semibold outline-none w-full py-2 text-sm text-gray-500 border-b-[1.5px]"
          @blur="() => {
            if (addressTextInput.length < 1) {
              addressTextError = 'Vui lòng không để trống ';
            }
          }"
        />
        </div>
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ addressTextError }}
        </p>
      </div>
    </div>

    <div class="w-full flex space-x-4 h-20">
      <div class="w-full">
        <div class="font-semibold text-gray-500">Số điện thoại:</div>
        <input type="text" v-model="phoneReceiver" maxlength="10"
          class="w-[95%] font-semibold outline-none border-b-[1px] py-2 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
          oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
          @blur="() => {
            if (phoneReceiver.length == 10) {
              phoneError = '';
              phoneReceiver = `(+84) ${phoneReceiver.substring(1, 4)} ${phoneReceiver.substring(4, 7)} ${phoneReceiver.substring(7, 10)}`;
            } else if (phoneReceiver.length == 0) {
              phoneTextError = 'Vui lòng không để trống';
            }
          }"

          @focus="() => {
            if (phoneReceiver.length == 17) {
              phoneReceiver = '0' + phoneReceiver.substring(6, 9) + phoneReceiver.substring(10, 13) + phoneReceiver.substring(14, 17);
            }
          }"

        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ phoneTextError }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClientStore } from "~/store/client";
import { usePackageStore } from "~/store/package";
const clientStore = useClientStore();
const packageStore = usePackageStore();

let phoneReceiver = ref<string>("");

let nameInput = ref<string>("");
let addressTextInput = ref<string>("");

let nameTextError = ref<string>("");
let phoneTextError = ref<string>("");
let addressError = ref<string>("");
let addressTextError = ref<string>("");

let newReceiveAddress = computed(() => {
  return clientStore.newReceiveProvince +
    clientStore.newReceiveDistrict +
    clientStore.newReceiveWard
    ? clientStore.newReceiveProvince +
        clientStore.newReceiveDistrict +
        clientStore.newReceiveWard
    : "";
});

let phoneError = ref<string>("");

watch(() => nameInput.value, () => {
  if(nameInput.value.length != 0) {
    nameTextError.value = '';
    packageStore.receiver_name = nameInput.value;
  } 
})

watch(() => addressTextInput.value, () => {
  if(addressTextInput.value.length != 0) {
    addressTextError.value = '';
  }
})

watch(() => phoneReceiver.value, () => {
  if(phoneReceiver.value.length != 0) {
    phoneTextError.value = '';
    packageStore.receiver_phone_no = phoneReceiver.value;
  }
})

watch(() => newReceiveAddress.value, () => {
  if(newReceiveAddress.value.length != 0) {
    addressError.value = '';
    packageStore.receiver_address = newReceiveAddress.value;
  }
})

</script>
