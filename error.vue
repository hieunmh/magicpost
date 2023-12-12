<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="relative w-[500px] h-[500px] bg-white rounded-xl sm:shadow-xl sm:border-[1px] flex items-center justify-center">
      <Icon @click="backRouter()" name="ion:md-arrow-round-back" 
        size="40" class="absolute top-4 left-4 text-[#189ab4] cursor-pointer" 
      />

      <div class="flex flex-col items-center justify-center cursor-auto">
        <img src="/not-found.jpg" alt="error" class="max-w-[300px]">
        <p class="font-semibold text-2xl text-center">Trang không tồn tại</p>
        <p class="font-semibold text-gray-400 text-center p-4">Oops, trang bạn đang tìm kiếm không tồn tại</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const router = useRouter();

const backRouter = () => {
  router.back();
}

</script>
