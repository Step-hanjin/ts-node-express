import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import sidebarRoutes from "./layout";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home        
    },
    ...sidebarRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;