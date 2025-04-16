<script setup lang="ts">
import Headbar from '@/layouts/Headbar.vue';
import Sidebar from '@/layouts/Sidebar.vue';
</script>
<template>
  <Sidebar />
  <div class="ml-52 p-8">
    <h1 class="text-2xl font-bold">Main Content</h1>
    <p class="text-gray-600">This content appears next to the fixed sidebar.</p>
  </div>
</template>

<style scoped>
</style>
