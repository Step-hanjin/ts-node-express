import { defineStore } from 'pinia'

export interface SidebarItem {
    label: string,
    route: string
}

interface LayoutState {
    activeMenuItem: string,
    sidebarItems: SidebarItem[]
}
export const useLayoutStore = defineStore('layout', {
    state: (): LayoutState => ({
        activeMenuItem: '',
        sidebarItems: [
            { label: 'Countries', route: '/countries' },
            { label: 'Payment months', route: '/paymonths' },
            { label: 'Contacts', route: '/contacts' }
        ]
    }),
    actions: {
        setActiveMenuIem(label: string) {
            this.activeMenuItem = label;
        },
        setSidebarItems(items: SidebarItem[]) {
            this.sidebarItems = items
        }
    }
});