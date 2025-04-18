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
            <RouterLink 
                v-for="item in items"
                :to="item.route"
                :key="item.route"
                @click="handleMenuClick(item.label)"
                >
                <li 
                    class="p-4 hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200' : layoutStore.activeMenuItem === item.label }"
                >
                        {{ item.label }}
                </li>
            </RouterLink>
    </ul>
    </nav>
</aside>
</template>
  
