<template>
  <div>
    <form class="mt-10" @submit.prevent="register()">
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
                @input="() => incorrectError = ''"
              >
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ emailError }}</p>
          </div>

          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="phoneError ? 'border-b-red-500': ''">
              <Icon name="material-symbols:call-sharp" size="30" class="text-gray-400" />
              <input type="text" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Số điện thoại" v-model="phone" 
                oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
                maxlength="10"
                @blur="() => {
                  if (phone.length == 10) {
                    phoneError = '';
                    phone = `(+84) ${phone.substring(1, 4)} ${phone.substring(4, 7)} ${phone.substring(7, 10)}`
                  }
                }"
                @focus="() => {
                  if (phone.length == 17) {
                    phone = '0' + phone.substring(6, 9) + phone.substring(10, 13) + phone.substring(14, 17);
                  }
                }"
              >
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ phoneError }}</p>
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
                </div>
              </div>
              <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ passwordError }}</p>
            </div>
          
          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="confirmPasswordError ? 'border-b-red-500': ''">
              <Icon name="material-symbols:lock" size="30" class="text-gray-400" />
              <input :type="confirmPasswordType" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Nhập lại mật khẩu" v-model="confirmPassword" 
              >
              
              <div class="flex items-center justify-center">
                <Icon name="bx:bxs-hide" size="25" class="text-gray-400" 
                  v-if="confirmPasswordType == 'password'" @click="toggleConfirmPassword()"
                />
                <Icon name="bx:bxs-show" size="25" class="text-gray-400" 
                  v-else  @click="toggleConfirmPassword()"
                />
                </div>
              </div>
              <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ confirmPasswordError }}</p>
              <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ incorrectError }}</p>
          </div>


          <button class="mt-6 w-full rounded-lg h-12 font-semibold flex items-center justify-center text-center"
            :class="email && phone && password && confirmPassword && emailError.length < 1  &&
            phoneError.length < 1 && passwordError.length < 1 && confirmPasswordError.length < 1
            ? 'bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
            :disabled="!phone || !password || phoneError.length > 0 || passwordError.length > 0"
          > 
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class="animate-spin"  />
            <p v-else>Tạo tài khoản</p> 
          </button>
        </form>
        <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ createError }}</p>
  </div>
</template>
<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

definePageMeta({middleware: 'loggedin'});

let password = ref<string>('');
let passwordError = ref<string>('');
let passwordType = ref<string>('password');

let confirmPassword = ref<string>('');
let confirmPasswordError = ref<string>('');
let confirmPasswordType = ref<string>('password');

let email = ref<string>('');
let emailError = ref<string>('');

let phone = ref<string>('');
let phoneError = ref<string>('');

let incorrectError = ref<string>('');

let isLoading = ref<boolean>(false);
let createError = ref<string>("");

const togglePassword = () => {
  if (passwordType.value == 'text') {
    passwordType.value =  'password';
  }
  else if (passwordType.value == 'password') {
    passwordType.value = 'text';
  }
}

const toggleConfirmPassword = () => {
  if (confirmPasswordType.value == 'text') {
    confirmPasswordType.value =  'password';
  }
  else if (confirmPasswordType.value == 'password') {
    confirmPasswordType.value = 'text';
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
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/.test(password.value)) {
      passwordError.value = 'Mật khẩu cần chứa ít nhất 1 chữ số, 1 chữ in hoa và 1 ký tự đặc biệt';
    }
    else {
      passwordError.value = '';
    }
  }
})

watch(() => confirmPassword.value, () => {
  if (password.value.length > 0 && confirmPassword.value != password.value) {
    confirmPasswordError.value = 'Mật khẩu không trùng khớp';
  } else {
    confirmPasswordError.value = '';
  }
})

watch(() => phone.value, () => {
  if (phone.value.startsWith('(+84)')) return;
  if (!phone.value.startsWith('0')) {
    phoneError.value = 'Số điện thoại phải bắt đầu bằng 0';
  }
  else if (phone.value.length < 10 && phone.value.length > 0) {
    phoneError.value = 'Số điện thoại phải đủ 10 chữ số'
  }

  else {
    phoneError.value = '';
  }
})

const register = async () => {
  isLoading.value = true;
  if(userStore.userInfo.role?.toLowerCase() == "transaction_point_head") {
    const createNewAcc =  await useFetch(`/api/auth/Transaction/createNewAccountTransaction`, {
      method: 'post',
      body: {
        email:  email.value,
        phone: `84${phone.value.substring(6, 9)}${phone.value.substring(10, 13)}${phone.value.substring(14, 17)}`,
        password: password.value
      }
    })
    if (!createNewAcc) {
      isLoading.value = false;
      createError.value = 'Không tạo được tài khoản'
    }
  } else if (userStore.userInfo.role?.toLowerCase() == "aggregation_point_head") {
    const createNewAcc = await useFetch(`/api/auth/Aggregation/createNewAccountAggregation`, {
      method: 'post', 
      body: {
        email:  email.value,
        phone: `84${phone.value.substring(6, 9)}${phone.value.substring(10, 13)}${phone.value.substring(14, 17)}`,
        password: password.value
      }
    })

    if (!createNewAcc) {
      isLoading.value = false;
      createError.value = 'Không tạo được tài khoản'
    }
  }
   

  isLoading.value = false;

  router.push('/');
  clientStore.isLoading = true;

  setTimeout(() => {
    clientStore.isLoading = false;
  }, 1000);
}
</script>