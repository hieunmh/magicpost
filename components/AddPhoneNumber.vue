<template>
  <div class="w-full h-full fixed z-50 top-[0] flex items-center justify-center">
    <div class="sm:mx-0 mx-4 w-[500px] bg-white h-[500px] rounded-xl sm:shadow-xl sm:border-[1px]">
      <NuxtLink to="/">
        <h1 class="text-center flex flex-col items-center justify-center font-bold text-[20px] translate-y-10 text-[#189ab4] mb-10">
          <img src="/mgpost.png" width="150" alt="">
        </h1>
      </NuxtLink>

      <div class="p-8 flex flex-col justify-center relative">
        <h1 class="md:text-3xl text-2xl text-center font-semibold text-gray-500">Thêm số điện thoại</h1>
        <form class="mt-10" @submit.prevent="">
          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center">
              <Icon name="material-symbols:call-sharp" size="30" class="text-gray-400" />
              <input type="text" class="w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Số điện thoại" v-model="phone" 
                oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
                maxlength="10" @input="incorrectError = ''"
              >
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ phoneError }}</p>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ incorrectError }}</p>
            <p class="text-green-500 font-semibold mt-1 text-[14px]">{{ success }}</p>
          </div>

          <button @click="addPhoneNumber" class="mt-6 w-full rounded-lg h-12 font-semibold flex items-center justify-center text-center"
            :class="phoneError.length < 1 && phone ? 'bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
            :disabled="phone.length < 10 || phoneError.length > 0"
          > 
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class=" animate-spin"  />
            <p v-else>Thêm</p>
          </button>

          <button @click="logOut()" class="mt-6 w-full rounded-lg h-12 font-semibold bg-[#05445e] text-white"> 
            <p>Đăng xuất</p>
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

import { useUserStore } from '~/store/user';
import { UserType } from '~/types/userType';
const userStore = useUserStore();

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

let phone = ref<string>('');
let phoneError = ref<string>('');

let incorrectError = ref<string>('');
let success = ref<string>('');
let isLoading = ref<boolean>(false);


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


const addPhoneNumber = async () => {
  isLoading.value = true;

  const { data, error } = await useFetch('/api/auth/addPhoneNumber', {
    method: 'post',
    body: {
      phone: `+84${phone.value.substring(1)}`,
      userId: user.value?.id,
    }
  })
  

  userStore.userInfo.phone ='0' + phone.value;
  

  if (error && error.value?.message) {
    isLoading.value = false;
    incorrectError.value = 'Số điện thoại đã được đăng ký!'
    return;
  } 


  isLoading.value = false;
  success.value = 'Thêm số điện thoại thành công!';
  setTimeout(() => {
    clientStore.havePhone = true;
  }, 700);
}

const logOut = async () => {

  userStore.userInfo = <UserType>{};

  clientStore.isLoading = true;

  await client.auth.signOut();

  setTimeout(() => {
    clientStore.isLoading = false;
  }, 1500);

  router.push('/login');
} 

</script>