<template>
  <div class="w-full h-full flex items-center justify-center">
    <button @click="router.back()" class="absolute top-6 left-4 block sm:hidden">
      <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
    </button>

    <div class="w-[500px] bg-white h-[500px] lg:ml-20 rounded-xl sm:shadow-xl sm:border-[1px]">
      <NuxtLink to="/">
        <h1 class="text-center flex flex-col items-center justify-center font-bold text-[20px] translate-y-10 text-[#189ab4] mb-10">
          <img src="/mgpost.png" width="150" alt="">
        </h1>
      </NuxtLink>

      <div class="p-8 flex flex-col justify-center relative">
        <button @click="router.back()" class="absolute top-9 hidden sm:block">
          <Icon name="ooui:arrow-previous-ltr" size="30" class="text-[#189ab4]" />
        </button>

        <h1 class="md:text-3xl text-2xl text-center font-semibold text-gray-500">Cập nhật mật khẩu</h1>
        <form class="mt-10" @submit.prevent="">
          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="newPasswordError ? 'border-b-red-500' : ''">
              <Icon name="material-symbols:lock" size="30" class="text-gray-400" />
              <input :type="passwordType" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Mật khẩu mới" v-model="newPassword" @input="incorrectError = ''"
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
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ newPasswordError }}</p>
          </div>

          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="confirmNewPasswordError ? 'border-b-red-500' : ''">
              <Icon name="material-symbols:lock" size="30" class="text-gray-400" />
              <input :type="confirmPasswordType" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Nhập lại mật khẩu" v-model="confirmNewPassword" @input="incorrectError = ''"
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

            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ confirmNewPasswordError }}</p>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ incorrectError }}</p>
            <p class="text-green-600 font-semibold mt-1 text-[14px]">{{ success }}</p>
          </div>
          
          <button @click="updatePassword()" class="mt-6 w-full rounded-lg h-12 font-semibold flex items-center justify-center text-center"
          :class="newPassword && confirmNewPassword && newPasswordError.length < 1 && confirmNewPasswordError.length < 1
            ? 'bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
          > 
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class=" animate-spin"  />
            <p v-else>Cập nhật</p>
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

definePageMeta({middleware: 'loggedin'});

let newPassword = ref<string>('');
let newPasswordError = ref<string>('');
let passwordType = ref<string>('password');

let confirmNewPassword = ref<string>('');
let confirmNewPasswordError = ref<string>('');
let confirmPasswordType = ref<string>('password');

let incorrectError = ref<string>('');
let success = ref<string>('');
let isLoading = ref<boolean>(false);

watch(() => newPassword.value, () => {
  if (newPassword.value == confirmNewPassword.value) {
    confirmNewPasswordError.value = '';
  }
  else if (newPassword.value.length >= 8 && confirmNewPassword.value.length > 0 && newPassword.value != confirmNewPassword.value) {
    confirmNewPasswordError.value = 'Mật khẩu không trùng khớp';
  }
  
  if (newPassword.value.length < 8) {
    newPasswordError.value = 'Mật khẩu cần chứa ít nhất 8 ký tự';
  }
  else {
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/.test(newPassword.value)) {
      newPasswordError.value = 'Mật khẩu cần chứa ít nhất 1 chữ số, 1 chữ in hoa và 1 ký tự đặc biệt';
    }
    else {
      newPasswordError.value = '';
    }
  }
})

watch(() => confirmNewPassword.value, () => {
  if (newPassword.value.length >= 8 && confirmNewPassword.value != newPassword.value) {
    confirmNewPasswordError.value = 'Mật khẩu không trùng khớp';
  } else {
    confirmNewPasswordError.value = '';
  }
})

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
 
const updatePassword = async () => {
  isLoading.value = true;
  const { data, error }  = await client.auth.updateUser({
    password: newPassword.value
  })
  if (error) {
    incorrectError.value = 'Mật khẩu mới không được giống mật khẩu cũ!'
    isLoading.value = false;
    return;
  }

  success.value = 'Đổi mật khẩu thành công!';

  isLoading.value = false;
  setTimeout(() => {
    clientStore.isLoading = true;
    setTimeout(() => {
      router.push('/');
      clientStore.isLoading = false;
    }, 1500);
  }, 3000);

}

</script>