<template>
  <div class="w-full h-full flex items-center justify-center lg:bg-[#189ab4]">
    <div class="text-[30px] font-bold lg:text-white text-[#189ab4] hidden lg:block">
      <NuxtLink to="/">
        <img src="/mgpostwhitev2.png" width="400" alt="">
        Ship siêu rẻ - Giao siêu tốc
      </NuxtLink>
    </div>

    <div class="w-[500px] bg-white h-fit lg:h-[490px] lg:ml-20 rounded-xl sm:shadow-xl sm:border-[1px] lg:border-none">
      <NuxtLink to="/">
        <h1 class="text-center flex flex-col items-center justify-center font-bold text-[20px] translate-y-10 text-[#189ab4] lg:hidden">
          <img src="/mgpost.png" width="150" alt="">
        </h1>
      </NuxtLink>

      <div class="p-8 flex flex-col justify-center">
        <h1 class="text-3xl text-center font-semibold hidden lg:block text-gray-500">Đăng nhập</h1>
        
        <form class="mt-10" @submit.prevent="login()">
          <div class="h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="emailError ? 'border-b-red-500' : ''">
              <Icon name="material-symbols:person" size="30" class="text-gray-400" />
              <input type="text" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Email" v-model="email" 
              >
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ emailError }}</p>
          </div>
          
          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="passwordError ? 'border-b-red-500': ''">
              <Icon name="material-symbols:lock" size="30" class="text-gray-400" />
              <input :type="passwordType" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Mật khẩu" v-model="password" @input="() => incorrectError = ''"
              >


              <div class="flex items-center justify-center">
                <Icon name="bx:bxs-hide" size="25" class="text-gray-400" 
                  v-if="passwordType == 'password'" @click="togglePassword()"
                />
                <Icon name="bx:bxs-show" size="25" class="text-gray-400" 
                  v-else  @click="togglePassword()"
                />
                <NuxtLink to="/reset">
                  <p class="font-semibold text-blue-500 cursor-pointer hover:underline ml-1">Quên?</p>
                </NuxtLink>
              </div>
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ passwordError }}</p>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ incorrectError }}</p>

          </div>

          <button class="mt-6 w-full rounded-lg h-12 font-semibold"
            :class="email && password && emailError.length < 1 && passwordError.length < 1 
            ? ' bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
            :disabled="!email || !password || emailError.length > 0 || passwordError.length > 0"
          > 
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="30" class="animate-spin"  />
            <p v-else>Đăng nhập</p>
          </button>
        </form>

        <button class="w-full h-12 rounded-lg bg-[#e8e8e8] hover:bg-[#e1e1e1] mt-6 flex items-center justify-center cursor-pointer"
          @click="loginWithGoogle()"
        >
          <img src="/google-logo.png" alt="" class="w-[25px]">
          <p class="ml-1.5 font-semibold text-gray-500">Đăng nhập bằng Google</p>
        </button>

        <p class="mt-6 text-center text-gray-500 font-semibold text-[18px]">
          Bạn chưa có tài khoản? 
          <NuxtLink to="/register" class="text-blue-500 hover:text-blue-600 hover:underline">Đăng ký</NuxtLink>
        </p>
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

let password = ref<string>('');
let passwordError = ref<string>('');
let passwordType = ref<string>('password');

let incorrectError = ref<string>('');

let isLoading = ref<boolean>(false);


const togglePassword = () => {
  if (passwordType.value == 'text') {
    passwordType.value =  'password';
  }
  else if (passwordType.value == 'password') {
    passwordType.value = 'text';
  }
}

 

watch(() => password.value, () => {
  if (password.value.length < 8) {
    passwordError.value = 'Mật khẩu cần chứa ít nhất 8 ký tự';
  }
  else {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/.test(password.value)) {
      passwordError.value = 'Mật khẩu cần chứa ít nhất 1 chữ số, 1 chữ in hoa và 1 ký tự đặc biệt';
    }
    else {
      passwordError.value = '';
    }
  }
})

const login = async () => {
  isLoading.value = true;

  let { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  isLoading.value = false;

  if (error) {
    console.log(error); 
    incorrectError.value = 'Sai số điện thoại hoặc mật khẩu';
    return;
  }
  
  router.push('/');

  userStore.isLoading = true;

  setTimeout(() => {
    userStore.isLoading = false;
  }, 1000);
}

const loginWithGoogle = async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  })
}

</script>
