<template>
  <MainLayout class="">
    <div class="bg-[#189ab4] fixed w-full h-full">
      <h1 class="text-4xl">Magic Post</h1>
    </div>
  </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '~/layouts/MainLayout.vue';

const user = useSupabaseUser();
const client = useSupabaseClient();

const router = useRouter();

let isLoading = ref<boolean>(false);

</script>
