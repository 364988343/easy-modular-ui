/*
 * @Author: 陈曦
 * @Date: 2021-04-18 16:00:45
 * @Description: 路由守卫
 */

import 'nprogress/nprogress.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import NProgress from 'nprogress'
import cache from '../utils/cache'

// 路由实例
let router
// 路由集合
let routes = Routes

// 错误路由
const errorRoutes = ['error403', 'error404']
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

// 进度条初始值
NProgress.configure({
  minimum: 0.2
})

/** 初始化路由 */
export default (store, system) => {
  router = new VueRouter({
    routes
  })

  // 路由过滤器
  router.beforeEach((to, from, next) => {
    // 开始进度条
    NProgress.start()
    // 默认页
    const homeRoute = system.home
    // 如果访问的时 / 或者 /default，则跳转到首页
    if (homeRoute && (to.path === '/' || to.path === '/default')) {
      if (homeRoute.startsWith('http://') || homeRoute.startsWith('https://')) {
        next({
          name: 'iframe',
          params: {
            url: homeRoute,
            tn_: '首页'
          }
        })
      } else {
        next(homeRoute)
      }
      NProgress.done()
      return
    }

    const _token = cache.get('accessToken')
    //未登录时跳转至登录页
    if (!_token && to.name !== 'login') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
      return
    }
    //如果是登录页、刷新或者是错误页面，直接跳转
    if (to.name === 'login' || to.name === 'refresh' || errorRoutes.includes(to.name)) {
      next()

      NProgress.done()
      return
    }
    //如果用户有路由权限则打开相应的路由页面
    if (to.path === homeRoute || store.state.app.user.routes.find((m) => m.routeName === to.name) || to.name === 'iframe') {
      store
        .dispatch('app/page/open', to, {
          root: true
        })
        .then(() => {
          next()
          NProgress.done()
        })
      return
    }
    //其余情况则跳转未授权页面403
    next({
      name: 'error403'
    })
  })
}

export { router, routes }
