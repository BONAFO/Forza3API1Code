import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  { path: "/", component: () => import("@/components/Home/Home.vue") },
  { path: '/:marca', component: ()=> import('@/components/Cars/Cars.vue')},  
  { path: '/:marca/:car', component: ()=> import('@/components/Car/Car.vue')},  

];

export const BASE_URL = "/#/";



const deploy = "github";

let router;

router = createRouter({
  history: createWebHashHistory(BASE_URL),
  routes,
});

export const redirect =(uri="")=>{
  window.location.href = window.origin + BASE_URL + uri;
}
// if (process.env.NODE_ENV === "development") {
//   router = createRouter({
//     history: createWebHistory(BASE_URL),
//     routes,
//   });
// } else if (process.env.NODE_ENV === "production") {
//   if(deploy == "github"){
//       router = createRouter({
//     history: createWebHashHistory(BASE_URL),
//     routes,
//   });
//   }
// }


export default router;
