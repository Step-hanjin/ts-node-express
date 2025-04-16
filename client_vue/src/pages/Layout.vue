<script setup lang="ts">
import Headbar from '@/layouts/Headbar.vue';
import Sidebar from '@/layouts/Sidebar.vue';
import MainContent from '@/layouts/MainContent.vue';
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Headbar />
      <!-- Content -->
      <div class="flex flex-1 overflow-hidden">
        <Sidebar />
      <main class="flex-1 p-6 overflow-y-auto">
        <MainContent />
      </main>
      </div>
    </div>
</template>

<style scoped>
</style>
