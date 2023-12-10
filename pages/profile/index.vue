<template>
  <MainLayout>
    <div class="w-full text-center">
      <p class="text-2xl text-gray-500">{{  }}</p>
      <p class="text-4xl font-semibold">{{ role.name }}</p>
      <p class="text-4xl font-semibold">{{ userInfo.birthday }}</p>
      <div class="flex flex-col items-center">
        <input type="text" name="" v-model="moreInfo" placeholder="More info"
          class="bg-gray-200 h-12 text-[18px] rounded-lg outline-none w-[300px] px-4 text-gray-500 font-semibold"
        >
        <button @click="addMoreInfo()" class="bg-[#189ab4] hover:bg-[#189] text-white rounded-lg px-4 py-2 font-semibold mt-4">
          Update
        </button>
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

import { useUserStore } from '~/store/user';
const userStore = useUserStore();

import { useClientStore } from '~/store/client';
const clientStore = useClientStore();

const { userInfo } = storeToRefs(userStore);

let moreInfo = ref<string>('');

const role = computed(() => {
  return clientStore.roles.filter(role => role.id === userInfo.value.role)[0] 
})

const user = useSupabaseUser();

definePageMeta({middleware: 'profile'});

const addMoreInfo = async () => {
  const { data, error } = await useFetch('/api/addMoreInfo', {
    method: 'post',
    body: {
      More_info: moreInfo.value,
      userId: user.value?.id
    }
  })
}

</script>