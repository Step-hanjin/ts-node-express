<script setup lang="ts">
import { useLayout } from '@/composables/pages/useLayout'
const {
    sidebarItems,
    activeMenuItem,
    setActiveMenuItem  
} = useLayout();

</script>
  
<template>
<aside class="w-48 lg:w-54 md:w-48 sm:w-30 bg-gray-100 overflow-y-auto">
    <nav>
        <ul class="">
            <RouterLink 
                v-for="item in sidebarItems"
                :to="item.route"
                :key="item.route"
                @click="setActiveMenuItem(item.label)"
                >
                <li 
                    class="p-4 hover:bg-gray-200 cursor-pointer"
                    :class="{ 'bg-gray-200' : activeMenuItem == item.label }"
                >
                        {{ item.label }}
                </li>
            </RouterLink>
    </ul>
    </nav>
</aside>
</template>
  
