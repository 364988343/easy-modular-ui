/*
 * @Author: 陈曦
 * @Date: 2021-04-19 22:44:35
 * @Description: 菜单管理
 */

import { store } from '../store'

/**
 * @description: 打开路由菜单
 * @param {Array} router 路由
 * @param {Object} menu 菜单
 */
const openRoute = (router, menu) => {
  let route = {
    name: menu.routeName,
    params: {},
  }

  if (menu.routeQuery) {
    route.query = JSON.parse(menu.routeQuery)
  }

  if (menu.routeParams) {
    route.params = JSON.parse(menu.routeParams)
  }

  route.params['tn_'] = menu.name
  router.push(route)
}

/**
 * @description: 打开链接菜单
 * @param {Array} router 路由
 * @param {Object} menu 菜单
 */
const openLink = (router, menu) => {
  const target = menu.target
  if (!target || target === 0) window.open(menu.url, '_blank')
  else window.open(menu.url, '_self')
}

/**
 * @description: 打开菜单
 * @param {Array} router 路由
 * @param {Object} menu 菜单
 */
const open = (router, menu) => {
  // 1、站内路由 2、站外链接
  if (menu.type === 1) openRoute(router, menu)
  else openLink(router, menu)
}

export { open }
