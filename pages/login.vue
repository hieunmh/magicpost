<template>
  <div class="w-full h-full flex items-center justify-center lg:bg-[#189ab4]">
    <div class="text-[70px] font-bold lg:text-white text-[#189ab4] hidden lg:block">
      Magic post
    </div>

    <div class="w-[500px] bg-white h-[500px] lg:ml-20 rounded-xl">
      <h1 class="text-center font-bold text-[50px] text-[#189ab4] block lg:hidden">Magic post</h1>

      <div class="p-8 flex flex-col justify-center">
        <h1 class="text-3xl text-center font-semibold hidden lg:block text-gray-500">Đăng nhập</h1>
        
        <form class="mt-8" @submit.prevent="login()">
          <div class="h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="emailError ? 'border-b-red-500' : ''">
              <Icon name="material-symbols:person" size="30" class=" text-gray-400" />
              <input type="text" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Email" v-model="email"
                @blur="() => {
                  if (email.length < 1) {
                    emailError = 'Vui lòng nhập email của bạn'
                  }
                }"
              >
            </div>
            <p class="text-red-500 mt-1 text-[14px]">{{ emailError }}</p>
          </div>
          
          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="passwordError ? 'border-b-red-500': ''">
              <Icon name="material-symbols:lock" size="30" class="text-gray-400" />
              <input :type="passwordType" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Mật khẩu" v-model="password"
              >


              <div class="flex items-center justify-center">
                <Icon name="bx:bxs-hide" size="25" class="text-gray-400" 
                  v-if="passwordType == 'password'" @click="togglePassword()"
                />
                <Icon name="bx:bxs-show" size="25" class="text-gray-400" 
                  v-else  @click="togglePassword()"
                />
                <p class="font-semibold text-gray-500 cursor-pointer hover:underline ml-1">Quên?</p>
              </div>
            </div>
            <p class="text-red-500 mt-1 text-[14px]">{{ passwordError }}</p>
          </div>

          <button class="mt-6 w-full rounded-xl h-12 font-semibold"
            :class="email && password && emailError.length < 1 && passwordError.length < 1 
            ? 'bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
            :disabled="!email || !password || emailError.length > 0 || passwordError.length > 0"
          >
            Đăng nhập
          </button>
        </form>

        <div class="w-full h-12 rounded-xl bg-[#e8e8e8] hover:bg-gray-300 mt-6 flex items-center justify-center cursor-pointer">
          <img src="/google-logo.png" alt="" class="w-[25px]">
          <p class="ml-2 font-semibold text-gray-500">Đăng nhập bằng google</p>
        </div>

        <p class="mt-6 text-center text-gray-500 font-semibold text-[18px]">
          Bạn chưa có tài khoản? 
          <NuxtLink to="/register" class="text-blue-500 hover:text-blue-600 hover:underline">Đăng ký</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

let email = ref<string>('');
let emailError = ref<string>('');
let password = ref<string>('');
let passwordError = ref<string>('');
let passwordType = ref<string>('password');


const client = useSupabaseClient();
const user = useSupabaseUser();

const router = useRouter();


const togglePassword = () => {
  if (passwordType.value == 'text') {
    passwordType.value =  'password';
  }
  else if (passwordType.value == 'password') {
    passwordType.value = 'text';
  }
}

watch(() => email.value, () => {
  if (email.value.length == 0) {
    emailError.value = 'Vui lòng nhập email của bạn';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    emailError.value = 'Email không hợp lệ';
  } else {
    emailError.value = '';
  }

}) 

watch(() => password.value, () => {
  if (password.value.length < 8) {
    passwordError.value = 'Mật khẩu cần chứa ít nhất 8 ký tự';
  }
  else {
    if (!/^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$/.test(password.value)) {
      passwordError.value = 'Mật khẩu cần chứa ít nhất 1 chữ số, 1 chữ in hoa và một ký tự đặc biệt';
    }
    else {
      passwordError.value = '';
    }
  }
})



const login = async () => {
  let { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  
  router.push('/');
}

</script>