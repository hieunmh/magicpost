<template>
  <div class="">
    <h1 class="text-4xl">Magic Post</h1>
    {{ user }}
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
</script>
