<script setup lang="ts">
import Headbar from '@/components/Layout/Headbar.vue';
import Sidebar from '@/components/Layout/Sidebar.vue';
import MainContent from '@/components/Layout/MainContent.vue';
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
