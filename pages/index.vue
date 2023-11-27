<template>
  <div class="">
    <h1 class="text-4xl">Magic Post</h1>
    {{ user }}
    <button v-if="user" @click="logOut()" class="mt-6 w-full rounded-lg h-12 font-semibold bg-gray-100"> 
      <Icon v-if="isLoading" name="eos-icons:loading" size="30"  />
      <p v-else>Đăng xuất</p>
    </button>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

const router = useRouter();

let isLoading = ref<boolean>(false);

const logOut = async () => {
  isLoading.value = true;
  await client.auth.signOut();
  isLoading.value = false;
  
  router.push('/login');
} 

</script>
