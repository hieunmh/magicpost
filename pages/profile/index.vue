<template>
  <MainLayout>
    <div class="w-full text-center">
      <p class="text-2xl text-gray-500">{{ userInfo.email }}</p>
      <p class="text-2xl text-gray-500">0{{ userInfo.phone?.substring(2) }}</p>
      <p class="text-4xl font-semibold">{{ userInfo.role }}</p>
      <p class="text-4xl font-semibold">{{ userInfo.birthday }}</p>
      <div class="flex flex-col items-center">
        <div class="flex mt-4">
          <input type="text" name="" v-model="moreInfo" placeholder="More info"
            class="bg-gray-200 h-12 text-[18px] rounded-l-lg outline-none px-4 text-gray-500 font-semibold"
          >
          <button @click="addMoreInfo()" class="bg-[#189ab4] h-12 w-[90px] hover:bg-[#189] text-white rounded-r-lg font-semibold">
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class="animate-spin"  />
            <p v-else>Cập nhật</p>
          </button>
        </div>

        <div class="flex mt-4">
          <input type="text" class="bg-gray-200 h-12 text-[18px] rounded-l-lg outline-none px-4 text-gray-500 font-semibold"
            placeholder="Số điện thoại" v-model="phone" 
            oninput="this.value = this.value.replace(/[^0-9.]/g, '')"
            maxlength="10"
          >

          <button @click="addPhoneNumber()" :disabled="phone.length < 1" :class="phone.length < 10 ? 'bg-gray-500' : 'bg-[#189ab4] hover:bg-[#189]'"
            class="h-12 w-[90px] text-white rounded-r-lg font-semibold"
          >
            <Icon v-if="isLoading" name="icon-park-outline:loading-one" size="25" class="animate-spin"  />
            <p v-else>Cập nhật</p>
          </button>
        </div>

        <NuxtLink to="/profile/update">
          <button class="bg-[#189ab4] hover:bg-[#189] text-white rounded-lg px-4 py-2 font-semibold mt-4">
            Cập nhật mật khẩu
          </button>
        </NuxtLink>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';
definePageMeta({middleware: 'loggedin'});

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

const { userInfo } = storeToRefs(userStore);

let moreInfo = ref<string>('');
let phone = ref<string>('');
let phoneError = ref<string>('');
let isLoading = ref<boolean>(false);

const user = useSupabaseUser();

const addMoreInfo = async () => {
  isLoading.value = true;
  const { data, error } = await useFetch('/api/auth/addMoreInfo', {
    method: 'post',
    body: {
      More_info: moreInfo.value,
      userId: user.value?.id
    }
  })
  isLoading.value = false;
}

const addPhoneNumber = async () => {
  isLoading.value = true;
  const { data, error } = await useFetch('/api/auth/addPhoneNumber', {
    method: 'post',
    body: {
      phone: `+84${phone.value.substring(1)}`,
      userId: user.value?.id,
    }
  })
  isLoading.value = false;
}

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

</script>