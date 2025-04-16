<script setup lang="ts">
import { ref } from 'vue'
import { useLayoutStore } from '@/stores/layout'
const layoutStore = useLayoutStore();
</script>

<template>
    <header class="bg-blue-700 text-white p-4">
    <h1 class="text-xl font-bold">{{ layoutStore.headTitle }}</h1>
    </header>
</template>
  
