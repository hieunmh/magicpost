<template>
  <div class="mb-6">
    <div class="mb-7 w-full text-lef font-semibold text-xl">
      Thông tin đơn hàng
    </div>
    <div class="w-full flex mb-7">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Tên sản phẩm:</div>
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
        <div class="w-full font-semibold text-gray-500">Tổng khối lượng:</div>
        <div class="w-full mt-2 relative">
          <div class="rounded-lg flex items-center bg-gray-100 md:w-full">
            <input
              type="text"
              placeholder="Vui lòng nhập thông tin"
              maxlength=""
              class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl font-semibold text-gray-500"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
              :value="weight"
              @blur="(e) => weight = (e.target as any).value"
            />
            <span
              class="text-gray-400 bg-gray-100 px-2 font-semibold border-l-2 rounded-r-lg text-xs sm:text-lg"
            >
              KG
            </span>
          </div>
          <div
            v-if="isChecked"
            class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full"
          />
        </div>
      </div>
    </div>

    <div class="w-full mb-7">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Mã khách hàng:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-75/110 font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { usePackageStore } from '~/store/package';
const packageStore = usePackageStore();

let isChecked = ref<boolean>(false);
let weight = ref<string>("0");

let textInput1 = ref<string>("");
let mainCharge = ref<number>();
let totalCharge = ref<number>(0);
let transportCharge = ref<number>();
let totalWeight = ref<number>(0);

let textInput = ref<string>("");
let notes = ref<string>("");

let textError1 = ref<string>("");
let textError = ref<string>("");

watch(() => textInput.value, () => {
  if(textInput.value.length != 0) {
    textError.value = '';
    packageStore.package_info = textInput.value;
  }
})

watch(() => textInput1.value, () => {
  if(Number(textInput1.value) > 0) {
    textError1.value = '';
    if (Number(textInput1.value) <= 10) {
      mainCharge.value = Number(textInput1.value);
      transportCharge.value = 0;
      totalCharge.value = Number(textInput1.value);
    } else {
      mainCharge.value = Number(textInput1.value);
      transportCharge.value = Number(textInput1.value) * 0.1;
      totalCharge.value = transportCharge.value + mainCharge.value;
    }
    packageStore.transportCharge = transportCharge.value;
    packageStore.mainCharge = mainCharge.value;
    packageStore.totalCharge = totalCharge.value;
  } 
})

watch(() => notes.value, () => {
  if(notes.value.length != 0) {
    packageStore.notes = notes.value;
  }
})

watch(() => weight.value, () => {
  if(weight.value.length != 0) {
    totalWeight.value = Number(weight.value);
  }
  packageStore.totalWeight = totalWeight.value;
})

</script>
