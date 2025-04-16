import { defineStore } from 'pinia'

export interface SidebarItem {
    label: string,
    route: string
}

interface LayoutState {
    headTitle: string,
    activeMenuItem: string,
    sidebarItems: SidebarItem[]
}
export const useLayoutStore = defineStore('layout', {
    state: (): LayoutState => ({
        headTitle: 'Select Sidebar',
        activeMenuItem: '',
        sidebarItems: [
            { label: 'Countries', route: '/countries' },
            { label: 'Payment months', route: '/paymonths' },
            { label: 'Contacts', route: '/contacts' }
        ]
    }),
    actions: {
        setActiveMenuItem(label: string) {
            this.headTitle = label;
            this.activeMenuItem = label;
        },
        setSidebarItems(items: SidebarItem[]) {
            this.sidebarItems = items
        }
    }
});