<template>
  <div>
    <div id="header" class="h-16 w-full flex items-center justify-evenly">
      <h1 class="text-center font-bold text-[30px] text-[#189ab4]">MG</h1>

      <div>
        <ul class="flex justify-between font-semibold w-full">
          <li v-for="(item, index) in menu" class="px-5 cursor-pointer text-gray-500 hover:text-[#189ab4]">
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="user" class="flex items-center cursor-pointer h-full w-[200px]" 
        @mouseover="() => showMenu = true" @mouseleave="() => showMenu = false"
      >
        <div class="flex text-center items-center justify-between w-full text-gray-500 font-semibold">
          <Icon name="material-symbols:account-circle" size="40" />
          <div>*******{{ user?.phone?.substring(8, 11) }}</div>
          <Icon name="ic:baseline-keyboard-arrow-down" size="30" />
        </div>

        <div class="absolute top-16 bg-white w-[200px] rounded-b-lg text-gray-500" 
          :class="showMenu ? 'visible opacity-100 z-50 transition-all duration-300 ease-in' 
          : 'invisible opacity-0 transition-all duration-300 ease-in z-50'"
        >
          <NuxtLink to="/profile" class="font-semibold h-12 flex items-center justify-center">
            <div class="font-semibold text-center w-full hover:text-[#189ab4]">
              Trang cá nhân
            </div>
          </NuxtLink>

          <button v-if="user" @click="logOut()" class=" w-full rounded-lg h-12 font-semibold hover:text-[#189ab4]"> 
            <Icon v-if="isLoading" name="eos-icons:loading" size="25"  />
            <p v-else>Đăng xuất</p>
          </button>
        </div>
      </div>
      
      <div v-else>
        Login
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

let isLoading = ref<boolean>(false);

let showMenu = ref<boolean>(false);

let menu = [
  'Vận chuyển',
  'Dịch vụ',
  'Tư Vấn khách hàng',
]

const logOut = async () => {
  isLoading.value = true;
  await client.auth.signOut();
  isLoading.value = false;
  
  router.push('/login');
} 


</script>

