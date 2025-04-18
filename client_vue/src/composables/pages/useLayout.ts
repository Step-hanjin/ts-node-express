import { ref } from 'vue';
import type { SidebarItem } from '@/types';

const headTitle = ref('Select Sidebar');
const activeMenuItem = ref('');
const sidebarItems = ref<SidebarItem[]>([
    { label: 'Countries', route: '/countries' },
    { label: 'Payment months', route: '/paymonths' },
    { label: 'Contacts', route: '/contacts' }
]);

function setActiveMenuItem(label: string) {
    headTitle.value = label;
    activeMenuItem.value = label;
    console.log('useLayout activeMenuItem.value=>', activeMenuItem.value);
}

function setSidebarItems(items: SidebarItem[]) {
    sidebarItems.value = items
}

export function useLayout() {
    return {
        headTitle,
        activeMenuItem,
        sidebarItems,
        setActiveMenuItem,
        setSidebarItems
    }
};