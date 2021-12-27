export default [
  {
    // 403
    path: '/error/403',
    name: 'error403',
    component: () => import('../page/403'),
    meta: {
      title: 'Error 403',
      cache: false
    }
  },
  {
    // 404
    path: '/error/404',
    name: 'error404',
    component: () => import('../page/404'),
    meta: {
      title: 'Error 404',
      cache: false
    }
  },
  {
    // sponsor
    path: '/sponsor/index',
    name: 'sponsor',
    component: () => import('../page/sponsor'),
    meta: {
      title: '捐赠',
      cache: false
    }
  }
]
