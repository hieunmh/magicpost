<template>
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
          v-model="textInput1"
          @blur="
            () => {
              if (textInput1.length < 1) {
                textError1 = 'Vui lòng không để trống';
              }
            }
          "
        />
        <p class="text-red-500 font-semibold mt-1 text-[14px]">
          {{ textError1 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let isChecked = ref<boolean>(false);
let weight = ref<string>("0");

let textInput1 = ref<string>("");
let textInput = ref<string>("");

let textError1 = ref<string>("");
let textError = ref<string>("");

const toggleChecked = () => {
  if (isChecked.value == false) {
    isChecked.value = true;
  } else {
    isChecked.value = false;
  }
};
</script>
