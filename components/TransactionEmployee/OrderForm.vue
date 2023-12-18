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
        />
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
        />
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
        />
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

  <div class="w-[80%] p-2 sm:p-6 rounded-xl shadow-lg border-[1px] mb-7">
    <div class="mb-7 w-full text-lef font-semibold">Thông tin người nhận</div>
    <div class="w-full md:flex mb-7">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Họ và tên:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
        />
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
        />
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
        />
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

  <div class="w-[80%] p-2 sm:p-6 rounded-xl shadow-lg border-[1px] mb-7">
    <div class="mb-7 w-full text-lef font-semibold text-xl">
      Thông tin đơn hàng
    </div>
    <div class="mb-5 bg-gray-300">
      <div class="ml-2">Thông tin đơn hàng</div>
    </div>
    <div class="w-full flex mb-7">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Tên sản phẩm:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
        />
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

    <div class="w-full md:flex mb-7">
      <div class="md:w-[50%] relative">
        <div class="md:w-full font-semibold text-gray-500">
          Kích thước đơn hàng:
        </div>
        <div class="flex md:w-[95%] mt-2 justify-between">
          <div class="w-[31%] relative">
            <div class="w-full rounded-lg bg-gray-100 flex items-center">
              <input
                type="text"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
                class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl text-gray-500 font-semibold"
                :class="[{ 'cursor-not-allowed': isChecked }]"
                :disabled="isChecked"
                placeholder="Dài"
              />
              <span
                class="text-gray-400 bg-gray-100 px-2 border-l-2 rounded-r-lg text-xs sm:text-lg font-semibold"
              >
                CM
              </span>
            </div>
            <div
              v-if="isChecked"
              class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full"
            />
          </div>

          <div class="w-[31%] relative">
            <div class="w-full rounded-lg bg-gray-100 flex items-center">
              <input
                type="text"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
                class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl text-gray-500 font-semibold"
                :class="[{ 'cursor-not-allowed': isChecked }]"
                :disabled="isChecked"
                placeholder="Rộng"
              />
              <span
                class="text-gray-400 bg-gray-100 px-2 border-l-2 rounded-r-lg text-xs sm:text-lg font-semibold"
              >
                CM
              </span>
            </div>
            <div
              v-if="isChecked"
              class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full"
            />
          </div>

          <div class="w-[31%] relative">
            <div class="w-full rounded-lg bg-gray-100 flex items-center">
              <input
                type="text"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
                class="bg-gray-100 w-full h-12 rounded-lg outline-none pl-4 text-sm sm:text-xl text-gray-500 font-semibold"
                :class="[{ 'cursor-not-allowed': isChecked }]"
                :disabled="isChecked"
                placeholder="Cao"
              />
              <span
                class="text-gray-400 bg-gray-100 px-2 border-l-2 rounded-r-lg text-xs sm:text-lg font-semibold"
              >
                CM
              </span>
            </div>
            <div
              v-if="isChecked"
              class="h-12 absolute cursor-not-allowed top-0 rounded-lg bg-gray-200 opacity-60 w-full"
            />
          </div>
        </div>
      </div>

      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Số lượng sản phẩm:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
        />
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

    <div class="w-full mb-7">
      <div class="font-semibold text-gray-500">Ghi chú:</div>
      <input
        type="text"
        class="bg-gray-100 w-[100%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
        placeholder=""
      />
    </div>

    <div class="mb-7 bg-gray-300">
      <div class="ml-2">Hình thức gửi hàng</div>
    </div>

    <div class="w-full mb-7">
      <div class="font-semibold text-gray-500 mb-1">Loại hình gửi hàng</div>
      <div class="flex items-center justify-center md:justify-start">
        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer">
          Lấy hàng tận nơi
        </p>
      </div>
    </div>

    <div class="w-full mb-7 mt-5">
      <div class="md:w-[50%]">
        <div class="font-semibold text-gray-500">Thời gian lấy hàng:</div>
        <div class="flex">
          <select name="time" class="border-[1px] w-[200px]">
            <option value="today">Today</option>
            <option value="tomorrow"></option>
            <option value="2 day left"></option>
          </select>
          <select class="border-[1px] ml-2 w-[200px]">
            <option value="today">10h đến trước 19h</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-7 bg-gray-300">
      <div class="ml-2">Thông tin dịch vụ</div>
    </div>

    <div class="w-full mb-7">
      <div class="font-semibold text-gray-500 mb-1">Loại hình gửi hàng</div>
      <div class="flex items-center justify-center md:justify-start">
        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer mr-4">
          Người gửi trả phí
        </p>

        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer">
          Người nhận trả phí
        </p>
      </div>
    </div>

    <div class="w-full mb-7">
      <div class="font-semibold text-gray-500 mb-1">
        Cho xem hàng, không cho thử
      </div>
      <div class="flex items-center justify-center md:justify-start">
        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer mr-4">
          Không
        </p>

        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer">Có</p>
      </div>
    </div>

    <div class="w-full mb-7">
      <div class="font-semibold text-gray-500 mb-1">Tiền thu hộ</div>
      <div class="flex items-center justify-center md:justify-start">
        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer mr-4">
          Không
        </p>

        <Icon
          v-if="isChecked"
          name="material-symbols:check-circle-rounded"
          color="#189ab4"
          size=""
          @click="toggleChecked()"
          class="text-[12px]"
        />
        <span
          v-else
          @click="toggleChecked()"
          class="w-[24px] h-[24px] flex items-center justify-center"
        >
          <span
            class="w-[20px] h-[20px] bg-white border-[#189ab4] border-[2px] rounded-full"
          ></span>
        </span>
        <p class="ml-2 font-semibold text-gray-500 cursor-pointer">Có</p>
      </div>
    </div>

    <div class="w-full mb-7">
      <div class="w-full">
        <div class="font-semibold text-gray-500">Giá trị bưu kiện:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[80%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng nhập thông tin"
        />
      </div>
    </div>
  </div>

  <div class="w-[80%] p-2 sm:p-6 rounded-xl shadow-lg border-[1px] mb-7">
    <div class="mb-7 w-full text-lef font-semibold">Phí vận chuyển</div>
    <div class="w-full flex mb-7">
      <div class="w-[50%]">
        <div class="font-semibold text-gray-500">Dịch vụ:</div>
        <input
          type="text"
          class="bg-gray-100 mt-2 w-[95%] font-semibold h-12 rounded-lg outline-none px-4 text-sm text-gray-500"
          placeholder="Vui lòng chọn"
        />
      </div>
    </div>

    <div class="mb-7 bg-gray-300">
      <div class="ml-2">Chi tiết giá</div>
    </div>

    <div>Phí vận chuyển(VND):</div>
    <div>Phí thu hộ(COD):</div>
    <div>Tổng giá trị:</div>
  </div>

  <button
    class="bg-[#189ab4] h-10 w-full md:w-fit px-6 rounded-lg text-white text-sm sm:text-xl font-semibold mt-6 mb-10"
  >
    Tạo đơn
  </button>
</template>

<script lang="ts" setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { useClientStore } from "~/store/client";
const clientStore = useClientStore();

let navigatorTab = ref<string>("follow");

let phoneSender = ref<string>("");
let phoneReceiver = ref<string>("");

let phoneError = ref<string>("");

onMounted(() => {
  navigatorTab.value = "follow";
});

let sendAddress = computed(() => {
  return clientStore.sendProvince +
    clientStore.sendDistrict +
    clientStore.sendWard
    ? clientStore.sendProvince + clientStore.sendDistrict + clientStore.sendWard
    : "";
});

let receiveAddress = computed(() => {
  return clientStore.receiveProvince +
    clientStore.receiveDistrict +
    clientStore.receiveWard
    ? clientStore.receiveProvince +
        clientStore.receiveDistrict +
        clientStore.receiveWard
    : "";
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
</script>
