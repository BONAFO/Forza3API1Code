import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: ()=> import('@/components/Home/Home.vue')},  
  { path: '/:marca/cars', component: ()=> import('@/components/Cars/Cars.vue')},  
];

const BASE_URL = '/Forza3API1/';

const router = createRouter({
  history: createWebHistory(BASE_URL), 
  routes
});

export default router;