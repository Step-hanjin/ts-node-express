<template>
    <header class="bg-blue-700 text-white p-4">
    <h1 class="text-xl font-bold">{{ title }}</h1>
    </header>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Country');
</script>