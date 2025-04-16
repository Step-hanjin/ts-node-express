<script setup lang="ts">
const items = [
    'Countries',
    'Payment months'
];
</script>
  
<template>
<aside class="w-48 lg:w-54 md:w-48 sm:w-30 bg-gray-100 overflow-y-auto">
    <nav>
        <ul class="">
            <li 
                v-for="item in items"
                class="p-4 hover:bg-gray-200 cursor-pointer"
            >
                {{ item }}
            </li>
        </ul>
    </nav>
</aside>
</template>
  
