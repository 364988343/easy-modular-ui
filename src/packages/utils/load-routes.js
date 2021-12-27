/*
 * @Author: 陈曦
 * @Date: 2021-04-18 21:08:22
 * @Description: 路由加载
 */

/**
 * @description: 单个页面配置信息转为路由信息
 * @param {Object} page 页面配置对象
 */
const loadPage = (page) => {
  return {
    path: page.path,
    name: page.name.toLowerCase(),
    component: page.component,
    props: page.props || true,

    meta: {
      title: page.title,
      icon: page.icon,
      frameIn: page.frameIn,
      cache: page.cache,
      buttons: page.buttons,
      isControl: page.isControl === undefined || page.isControl === null ? true : page.isControl,
      relateRoute: page.relateRoute
    }
  }
}

/**
 * @description 页面数组转为路由数组
 * @param {Object} module 模块信息
 * @param {Object} pages 页面数组
 */
export default (pages) => {
  let routes = []
  pages.forEach((item) => {
    if (item) {
      const route = loadPage(item)
      routes.push(route)
    }
  })
  return routes
}
