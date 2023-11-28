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
      <div class="w-[1100px] flex h-14 sm:h-28 p-2  sm:p-6 rounded-xl shadow-lg border-[1px]">
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
      <div class="w-[1100px] flex h-14 sm:h-28 p-2  sm:p-6 rounded-xl shadow-lg border-[1px]">
        <input type="text"  class="bg-gray-100 w-full outline-none rounded-lg pl-4 text-sm sm:text-xl font-semibold"
          placeholder="Ước tính chi phí"
        >
        <button class="bg-[#189ab4] w-28 sm:w-36 rounded-lg ml-2 sm:ml-6 text-white text-sm sm:text-xl font-semibold">
          Uớc tính
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