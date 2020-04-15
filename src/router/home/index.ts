const _import = (file:string) => () => import('@/views/' + file);
const Home = _import("Home");
const About = _import("About");

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '主页哟' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于' },
  },
];

