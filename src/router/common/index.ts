const _import = (file: string) => () => import('@/views/' + file);
const NotFound = _import('not-found/Index');

export default [
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '资源不存在' },
  }
];
