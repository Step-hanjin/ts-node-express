<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
const layoutStore = useLayoutStore();
const items = layoutStore.sidebarItems;

function handleMenuClick(label: string) {
    layoutStore.setActiveMenuItem(label);
}
</script>
  
<template>
<aside class="w-48 lg:w-54 md:w-48 sm:w-30 bg-gray-100 overflow-y-auto">
    <nav>
        <ul class="">
            <li 
                v-for="item in items"
                class="p-4 hover:bg-gray-200 cursor-pointer"
                :key="item.route"
                :class="{ 'bg-gray-200' : layoutStore.activeMenuItem === item.label }"
                @click="handleMenuClick(item.label)"
            >
                <RouterLink :to="item.route">
                    {{ item.label }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</aside>
</template>
  
