<template>
  <MainLayout class="">
    <div class="fixed w-full h-full">
      <OrderTracking />
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

const user = useSupabaseUser();
const router = useRouter();

onMounted( async () => {
  const { data, error } = await useFetch('/api/auth/getUser');
  console.log(data.value?.data);
  
})

</script>
