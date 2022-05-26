import Vue from 'vue';
import VueRouter from 'vue-router';
// import { localStorageGet } from '@/common/utils';

// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue');
const Menu = () => import(/* webpackChunkName: "Menu" */ '@/views/menu/Menu.vue');
const Order = () => import(/* webpackChunkName: "Order" */ '@/views/order/Order.vue');
const Restaurant = () => import(/* webpackChunkName: "Restaurant" */ '@/views/restaurant/Restaurant.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  // 登录页面路由对象
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  // 餐馆页面路由对象
  {
    path: '/restaurant',
    name: 'restaurant',
    component: Restaurant,
  },
  // 菜单页面路由对象
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
  },
  // 订单页面路由对象
  {
    path: '/order',
    name: 'order',
    component: Order,
  },
  {
    path: '/*',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const user = localStorageGet('user');
//   // 如果有用户信息且去的是登录页面，跳转到restaurant
//   if (user && to.path === '/login') {
//     next('/restaurant');
//   }
// });

export default router;
