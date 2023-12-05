<template>
  <div class="mt-6">
    <div class="w-full flex items-center justify-center">
      <div class="sm:w-[600px] w-[400px] px-10 sm:px-16 md:px-0">
        <div class="flex justify-between items-center">
          <button @click="navigatorTab = 'follow'" class="">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl mb-4 text-center"
              :class="navigatorTab == 'follow' ? ' text-[#189ab4]' : 'text-gray-500'"
            >
              Theo dõi đơn hàng
            </h1>
          </button>

          <button @click="navigatorTab = 'cost'" class="">
            <h1 class="font-semibold text-sm sm:text-2xl md:text-3xl  mb-4 text-center" 
              :class="navigatorTab == 'cost' ? 'text-[#189ab4]' : 'text-gray-500'"
            >
              Ước tính chi phí
            </h1>

          </button> 
        </div>

        <div class="h-2 w-full bg-slate-60 relative">
          <div class="absolute h-[6px] bg-[#189ab4] w-[30px] sm:w-[50px] md:w-[100px] rounded-full" 
            :class="[
              {'sm:left-[75px] left-[45px] transition-all duration-300': navigatorTab == 'follow' },
              {'md:left-[calc(100%-150px)] sm:left-[calc(100%-110px)] left-[calc(100%-65px)] transition-all duration-300': navigatorTab == 'cost' },
            ]"
          />
        </div>
      </div>
    </div>

    <div class="absolute top-20 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
      :class="[
        {'left-0 transition-all duration-300': navigatorTab == 'follow' },
        {'-left-[1500px] transition-all duration-300': navigatorTab == 'cost' },
      ]"
    >
      <div class="w-[1100px] flex h-14 sm:h-28 p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
        <input type="text"  class="bg-gray-100 w-full outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold"
          placeholder="Nhập mã đơn hàng"
        >
        <button class="bg-[#189ab4] w-28 sm:w-36 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold">
          Theo dõi
        </button>
      </div>
    </div>

    <div class="absolute top-20 w-full mt-6 px-4 sm:px-10 flex items-center justify-center"
      :class="[
        {'-right-[1500px] transition-all duration-300': navigatorTab == 'follow' },
        {'right-0 transition-all duration-300': navigatorTab == 'cost' },     
      ]"
    >
      <div class="w-[1100px] sm:text-xl flex flex-col sm: p-2 sm:p-6 rounded-xl shadow-lg border-[1px]">
        <div class="text-blue-400 mb-7 w-full text-left">Biểu phí dịch vụ </div>
        <div class="md:flex">
          <div class="md:w-[50%] ">
            <div class="">Địa chỉ lấy hàng: </div>
            <input type="text" class="bg-gray-100 mt-2 md:w-[90%] w-full h-9 rounded-xl outline-none pl-4 text-sm sm:text-xl"
            placeholder="Vui lòng chọn">
          </div>
          <div class="md:w-[50%]">
            <div>Địa chỉ người nhận: </div>
            <input type="text" class="bg-gray-100 mt-2 w-full h-9 rounded-xl outline-none pl-4 text-sm sm:text-xl"
            placeholder="Vui lòng chọn">
          </div>
        </div>

        <div class="md:flex mt-5">
          <div class="md:w-[50%]">
            <div class="md:w-full">Tổng khối lượng: </div>
            <div class="md:w-full mt-2">
              <div class="rounded-xl flex bg-gray-100 md:w-[90%] ">
                <input type="text" class="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl"
                placeholder="Vui lòng nhập thông tin">
                <span class="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">KG</span>
              </div>
            </div> 
          </div>
          <div class="md:w-[50%]">
            <div>Kích thước đơn hàng: </div>
            <div class="flex md:w-full mt-2 justify-between">
              <div class="w-[30%] rounded-xl bg-gray-100 flex">
                <input type="text" class="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl">
                <span class="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">CM</span>
              </div>
              <div class="w-[30%] rounded-xl bg-gray-100 flex">
                <input type="text" class="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl">
                <span class="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">CM</span>
              </div>
              <div class="w-[30%] rounded-xl bg-gray-100 flex">
                <input type="text" class="bg-gray-100 w-[93%] h-9 rounded-xl outline-none pl-4 text-sm md:text-xl">
                <span class="text-gray-400 bg-gray-100 py-1 pr-2 outline-none rounded-xl pl-4 text-xs md:text-lg mt-1">CM</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6">
            <input type="checkbox">
            Tôi không biết cân nặng chính xác của bưu kiện 
          </div>
        <button class="bg-[#189ab4] h-10 w-[300px] sm:w-100 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold mt-7">
          Tính phí giao hàng 
        </button> 
        </div>
    </div>
  </div>

</template>

<script lang="ts" setup>

let navigatorTab = ref<string>('follow');
onMounted(() => {
  navigatorTab.value = 'follow';
})

</script>