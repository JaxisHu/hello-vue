const _import = (file: string) => () => import('@/views/' + file);
const Home = _import("tabs/Home");
const ShoppingCart = _import("tabs/ShoppingCart");
const Order = _import("tabs/Order");
const Mine = _import("tabs/Mine");

export default [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: { title: '主页' },
  // },
  {
    path: '/tabs/home',
    name: 'Home',
    component: Home,
    meta: { title: '主页' },
  },
  {
    path: '/tabs/shopping-cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
    meta: { title: '购物车' },
  },
  {
    path: '/tabs/order',
    name: 'Order',
    component: Order,
    meta: { title: '订单' },
  },
  {
    path: '/tabs/mine',
    name: 'Mine',
    component: Mine,
    meta: { title: '我的' },
  },
];

