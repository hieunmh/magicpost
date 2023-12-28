<template>
  <div class="w-full h-full fixed z-50 top-[0] flex items-center justify-center bg-black"
    :class="ceoStore.showUpdate ? 'visible bg-opacity-50 transition-all duration-300 ease-in' 
    : 'invisible opacity-0 transition-all duration-300 ease-in'"
    @click.self="() => {
        ceoStore.showUpdate = false;
        emailError = '';
        email = '';
        phoneError = '';
        phone = '';
      }"
  >
    <div class="sm:mx-0 mx-4 w-[500px] bg-white h-[350px] rounded-xl sm:shadow-xl sm:border-[1px]">
      <div class="p-8 flex flex-col justify-center relative">
        <h1 class="md:text-3xl text-2xl text-center font-semibold text-gray-500">Cập nhật</h1>
        <form class="mt-" @submit.prevent="">
          <div class="h-16 mt-6">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="emailError ? 'border-b-red-500' : ''">
              <Icon name="material-symbols:person" size="30" class=" text-gray-400" />
              <input type="text" class=" w-full focus:outline-none pl-2 font-semibold text-[18px] text-gray-500"
                placeholder="Email" v-model="email"
                @input="() => incorrectError = ''"
              >
            </div>
            <p class="text-red-500 font-semibold mt-1 text-[14px]">{{ emailError }}</p>
          </div>

          <div class="mt-6 h-16">
            <div class="flex border-b-[1px] border-b-gray-400 items-center" :class="phoneError ? 'border-b-red-500' : ''">
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

          <button @click="updateUser()" class="mt-6 w-full rounded-lg h-12 font-semibold flex items-center justify-center text-center"
            :class="emailError.length < 1 && phoneError.length < 1 && phone || email ? 'bg-[#05445e] text-white': 'bg-[#e8e8e8] text-gray-500'"
            :disabled="phone.length < 10 || phoneError.length > 0"
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

import { useCeoStore } from '~/store/ceo';
const ceoStore = useCeoStore();

import { useAggregationStore } from '~/store/aggregation';
const aggregationStore = useAggregationStore();


let email = ref<string>('');
let emailError = ref<string>('');

let phone = ref<string>('');
let phoneError = ref<string>('');

let incorrectError = ref<string>('');
let success = ref<string>('');
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

const aggHead = computed(() => {
  return aggregationStore.allAggHead?.find(aggHead => {
    return aggHead.aggregation_point_id == aggregationStore.id;
  })
})

const updateUser = async () => {
  isLoading.value = true;
  const { data, error } = await useFetch('/api/auth/Ceo/updateUser', {
    method: 'post',
    body: {
      id: aggHead.value?.users.id,
      newEmail: email.value ? email.value : aggHead.value?.users.email,
      newPhone: phone.value ? '84' + phone.value.substring(1) : aggHead.value?.users.phone,
    }
  })

  if (error && error.value?.message) {
    isLoading.value = false;
    incorrectError.value = 'Trùng email hoặc số điện thoại';
  }

  else {    
    const res = await useFetch('/api/auth/Ceo/getAllAggregationHead');
    aggregationStore.allAggHead = res.data.value;
    incorrectError.value = '';
    isLoading.value = false;
    phoneError.value = '';
    emailError.value = '';
    incorrectError.value = ''
    success.value = 'Thay đổi thông tin thành công!';
  }

  setTimeout(() => {
    ceoStore.showUpdate = false;
    success.value = '';
  }, 1000);

}


</script>