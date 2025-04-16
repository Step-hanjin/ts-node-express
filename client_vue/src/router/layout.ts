import type { RouteRecordRaw } from "vue-router";
import Country from "@/pages/Country/Country.vue";
// import { useLayoutStore } from "@/stores/layout";

// const layoutStore = useLayoutStore();

// const sidebarItems = layoutStore.sidebarItems;

// const sidebarRoutes: RouteRecordRaw[] = sidebarItems.map(item => ({
//     path: item.route,
//     name: item.label,
// }));

const sidebarRoutes: RouteRecordRaw[] = [
    {
        path: '/countries',
        name: 'Countries',
        component: Country
    },
    {
        path: '/paymonths',
        name: 'Paymonths',
        component: Country
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Country
    }
];

export default sidebarRoutes;