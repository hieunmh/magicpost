<template>
  <div v-if="Number(clientStore.windowWidth) >= 1024" class="w-full h-full flex items-center justify-center">
    <div class="w-[1100px] h-[780px] bg-white border-[1px rounded-xl p-6">
      <div id="logo + QR" class="w-full px-10 pt-2">
        <NuxtLink to="/" id="logo">
          <img src="/mgpost.png" alt="" class="h-[60px]">
        </NuxtLink>
      </div>

      <div class="w-full border border-black mt-4 rounded-lg font-semibold text-gray-500 text-lg">
        <div id="top" class="w-full flex border-b border-black">
          <div id="left" class="w-[50%] p-2">
            <p class="h-10 font-bold text-black">1. Họ tên địa chỉ người gửi:</p>

            <div class="w-full h-10">Nguyễn Minh Hiếu</div>

            <div class="h-16">Khu 15, xã Tiên Kiên, huyện Lâm Thao, tỉnh Phú Thọ</div>

            <div class="flex h-10">
              <div class="w-[50%] flex">
                <div>Điện thoại:</div>
                <div class="ml-2">091 511 57 01</div>
              </div>

              <div class="w-[50%] flex">
                <div>Mã bưu chính:</div>
                <div class="ml-2">24500</div>
              </div>
            </div>
          </div>

          <div id="right" class="w-[50%] p-2 border-l border-l-black">
            <p class="h-10 font-bold text-black">2. Họ tên địa chỉ người nhận:</p>

            <div class="w-full h-10">Trường THCS Giấy Phong Châu</div>

            <div class="h-16">Khu 3, thị trấn Phong Châu, huyện Phù Ninh, Tỉnh Phú Thọ</div>

            <div class="flex h-10">
              <div class="w-[50%] flex">
                <div>Điện thoại:</div>
                <div class="ml-2">0210 3 88 5344</div>
              </div>

              <div class="w-[50%] flex">
                <div>Mã bưu chính:</div>
                <div class="ml-2">24500</div>
              </div>
            </div>
          </div>
        </div>

        <div id="bottom" class="w-full flex">
          <div id="left" class="w-[50%]">
            <div class="w-full p-2 border-b border-b-black">
              <div class="flex items-center w-full h-10 text-center">
                <p class="font-bold text-black">3. Loại hàng gửi: </p>
                <div class="flex mx-4 items-center">
                  <Icon v-if="isChecked" name="mdi:checkbox-blank-circle" 
                    color="#189ab4" size="" @click="toggleChecked()" class="text-[16px]"
                  />
                  <Icon v-else name="mdi:checkbox-blank-circle-outline" @click="toggleChecked()" 
                    class="text-[#189ab4] text-[16px]" 
                  />
                  <p>Hàng hóa</p>
                </div>

                <div class="flex items-center">
                  <Icon v-if="!isChecked" name="mdi:checkbox-blank-circle" 
                    color="#189ab4" size="" @click="toggleChecked()" class="text-[16px]"
                  />
                  <Icon v-else name="mdi:checkbox-blank-circle-outline" @click="toggleChecked()" 
                    class="text-[#189ab4] text-[16px]" 
                  />
                  <p>Tài liệu</p>
                </div>
              </div>

              <div class="flex h-10 items-center">
                <p class="font-bold text-black">4. Nội dung bưu gửi:</p>
                <input type="text" class="border-b mx-3 border-gray-500 outline-none">
              </div>
            </div>

            <div class="w-full p-2 border-b border-b-black">
              <p class="font-bold text-black">5. Cam kết của người gửi</p>
              <p>
                Tôi chấp nhận điều khoản tại mặt sau phiếu gửi và cam đoan bưu gửi này không chứa các mặt hàng 
                nguy hiểm , cấm gửi. Trường hợp không phát được, tôi sẽ trả cước chuyển hoàn.
              </p>
            </div>

            <div class="w-full flex p-2">
              <div class="w-[50%] h-24 flex flex-col justify-between">
                <p class="h-10 font-bold text-black">6. Ngày giờ gửi:</p>
                <div class="flex">
                  <p>{{ new Date().toLocaleTimeString('en-US', { hour12: false }) }}</p>
                  <p class="ml-2">{{ new Date().toLocaleDateString() }}</p>
                </div>
              </div>

              <div class="w-[50%] font-bold text-black">
                <p class="text-center">Chữ ký người gửi</p>
              </div>
            </div>
          </div>

          <div id="right" class="w-[50%] flex border-l border-l-black">
            <div id="left" class="w-[50%] h-full border-r border-r-black">
              <div class="w-full p-2 border-b border-b-black">
                <p class="font-bold text-black">7. Cước</p>
                <div class="flex justify-between">
                  <p>a, Cước chính</p>
                  <p>10.000</p>
                </div>

                <div class="flex justify-between">
                  <p>b, Cước GTGT</p>
                  <p>1.000</p>
                </div>

                <div class="flex justify-between">
                  <p>c, Tổng phí</p>
                  <p>11.000</p>
                </div>

                <div class="flex justify-between font-bold text-black">
                  <p>c, Tổng thu</p>
                  <p>11.000</p>
                </div>
              </div>

              <div class="w-full h-full p-2">
                <p class="font-bold text-black">8. Bưu cục chấp nhận</p>
                <p class="text-center">Chữ ký GDV nhận</p>
              </div>
            </div>

            <div id="right" class="w-[50%] h-full">
              <div class="w-full p-2 border-b border-b-black">
                <p class="font-bold text-black">9. Khối lượng (g)</p>
                <div class="flex justify-between">
                  <p>Khối lượng thực tế:</p>
                  <p>500</p>
                </div>
                <div class="flex justify-between">
                  <p>Khối lượng quy đổi:</p>
                  <p>500</p>
                </div>
              </div>

              <div class="w-full p-2">
                <p class="font-bold text-black">10. Ngày giờ nhận</p>
                <div class="text-center">
                  <p>.....h..... / ..... / ..... / 20......</p>
                </div>
                <div class="text-center">
                  <p>Người nhận / Người ủy quyền nhận</p>
                  <p>(Ký, ghi rõ họ tên)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="w-full h-screen px-4 sm:px-10 flex items-center justify-center">
    <div class="font-semibold text-2xl text-justify text-gray-500 flex flex-col items-center">
      <NuxtLink to="/" id="logo">
        <img src="/mgpost.png" alt="" class="h-[60px]">
      </NuxtLink>
      <p>Vui lòng sử dụng thiết bị có màn hình >= 1024px để thực hiện chức năng này</p>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

let isChecked = ref<boolean>(false);

const toggleChecked = () => {
  if (isChecked.value == false) {
    isChecked.value = true;
  }
  else {
    isChecked.value = false;
  }
}

</script>
