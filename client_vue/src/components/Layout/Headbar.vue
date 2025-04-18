<script setup lang="ts">
import { useLayout } from '@/composables/pages/useLayout'
const { headTitle } = useLayout();
</script>

<template>
    <header class="bg-blue-700 text-white p-4">
    <h1 class="text-xl font-bold">{{ headTitle }}</h1>
    </header>
</template>
  
