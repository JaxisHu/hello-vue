import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
/** 引入各个模块的路由 */
import CommonRouters from './common';
import TabsRouters from './tabs';
Vue.use(VueRouter);

/** 路由合并 */
const routes: Array<RouteConfig> = [
    ...CommonRouters,
    ...TabsRouters,
];

const router = new VueRouter({
  routes
});

export default router;
