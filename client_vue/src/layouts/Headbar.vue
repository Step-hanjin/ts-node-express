<template>
    <Menubar>
      <template #start>
        <h2>{{ title }}</h2>
      </template>
    </Menubar>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Country');
</script>
  
  <style scoped>
  img {
    vertical-align: middle;
  }
  </style>
  