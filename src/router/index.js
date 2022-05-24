import Vue from 'vue';
import VueRouter from 'vue-router';

// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/Login.vue');
const Menu = () => import(/* webpackChunkName: "Menu" */ '@/views/menu/Menu.vue');
const Order = () => import(/* webpackChunkName: "Order" */ '@/views/order/Order.vue');
const Restaurant = () => import(/* webpackChunkName: "Restaurant" */ '@/views/restaurant/Restaurant.vue');
const Error = () => import(/* webpackChunkName: "Error" */ '@/views/error/Error.vue');

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
  // 错误页面路由对象
  {
    path: '/*',
    name: 'error',
    component: Error,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
