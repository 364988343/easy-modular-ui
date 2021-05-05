import Vue from 'vue'
import ElementUI from 'element-ui'
import lodash from 'lodash'
import dayjs from 'dayjs'
import echarts from 'echarts'
import VCharts from 'v-charts'
import App from './App'
import Components from './components'
import UseRouter, { router, routes } from './router/'
import UseStore, { store, storeOptions } from './store/'
import Mixins from './mixins/'
import Directive from './directive'
import HttpInit from './utils/http'

import './styles/app.scss'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  //安装插件
  use: async ({ system }) => {
    // 回调方法
    let callbacks = []
    // 全局组件
    let globalComponents = []

    // 将lodash添加到Vue的实例属性
    Vue.prototype.$_ = lodash
    // 日期格式化插件
    Vue.prototype.$dayjs = dayjs

    Vue.prototype.$echarts = echarts

    // 加载饿了么框架
    Vue.use(ElementUI)

    // 加载v-charts组件
    Vue.use(VCharts)

    // 加载自定义组件
    Vue.use(Components)

    // 注册主组件
    Vue.component('em-app', App)

    // 注册指令
    Vue.use(Directive)

    // 全局混入
    Mixins.global(Vue)

    // 加载模块信息
    system.modules.forEach((m) => {
      // 注入路由信息
      if (m.routes) {
        m.routes.forEach((r) => routes.push(r))
      }
      // 注入状态信息
      if (m.store) {
        storeOptions.modules.module.modules[m.module.code] = m.store
      }
      // 注入回调方法
      if (m.callback) {
        callbacks.push(m.callback)
      }
      // 添加全局组件
      if (m.components) {
        m.components.forEach((c) => globalComponents.push(c))
      }
    })

    // 使用状态
    UseStore()

    // 使用路由
    UseRouter(store, system)

    // 加载页面数据
    await store.dispatch('app/system/init', system)

    // 注册全局组件
    if (globalComponents) {
      globalComponents.forEach((com) => {
        Vue.component(com.name, com.component)
      })
    }

    // 创建根实例
    const vm = new Vue({
      router,
      store,
      render: (h) => h('em-app')
    }).$mount('#app')

    // 处理回调
    if (callbacks) {
      let params = {
        vm,
        store,
        router,
        Vue
      }
      callbacks.map((callback) => {
        callback(params)
      })
    }

    //设置主题
    window.document.documentElement.setAttribute('data-theme', store.state.app.skins.theme)
    return {
      router,
      store,
      vm
    }
  },
  //设置接口
  useHttp: (config) => {
    HttpInit(config)
  }
}
