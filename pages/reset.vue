<template>
  <div class="w-full h-full flex items-center justify-center lg:bg-[#189ab4]">
    <button @click="router.back()" class="absolute top-6 left-4 block sm:hidden">
      <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
    </button>
    <div class="text-[70px] font-bold lg:text-white text-[#189ab4] hidden lg:block">
      <NuxtLink to="/">
        <img src="/mgpostwhitev2.png" width="400" alt="">
      </NuxtLink>
    </div>

    <div class="w-[500px] bg-white h-[500px] lg:ml-20 rounded-xl sm:shadow-xl sm:border-[1px] lg:border-none">
      <NuxtLink to="/">
        <h1 class="text-center flex flex-col items-center mb-10 justify-center font-bold text-[20px] translate-y-10 text-[#189ab4] lg:hidden">
          <img src="/mgpost.png" width="150" alt="">
        </h1>
      </NuxtLink>

      <div class="p-8 flex flex-col justify-center relative">
        <button @click="router.back()" class="absolute top-9 hidden sm:block">
          <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
        </button>
        <h1 class="md:text-3xl text-2xl text-center font-semibold text-gray-500">Quên mật khẩu</h1>
        <form class="mt-10" @submit.prevent="">
          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="emailError ? 'border-b-red-500' : ''">
              <Icon name="material-symbols:person" size="30" class="text-gray-400" />
              <input type="text" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Email" v-model="email"
                @blur="() => {
                  if (email.length < 1) {
                    emailError = 'Vui lòng nhập email của bạn'
                  }
                  
                }"
                @input="() => {
                  incorrectError = '';
                  
                }"
              >
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ emailError }}</p>
          </div>
          
    

          <button @click="resetPassword()" class="mt-6 w-full rounded-lg h-12 font-semibold"
          :class="email && emailError.length < 1
            ? 'bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
          > 
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class=" animate-spin"  />
            <p v-else>Tiếp</p>
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

definePageMeta({middleware: 'loggedin'});

let email = ref<string>('');
let emailError = ref<string>('');
let incorrectError = ref<string>('');
let isLoading = ref<boolean>(false);

watch(() => email.value, () => {
  if (email.value.length == 0) {
    emailError.value = 'Vui lòng nhập email của bạn';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    emailError.value = 'Email không hợp lệ';
  } else {
    emailError.value = '';
  }
}) 

const resetPassword = async () => {
  isLoading.value = true;
  await client.auth.resetPasswordForEmail(email.value, {
    redirectTo: `${location.origin}`,
  })
  isLoading.value = false;
}

</script>