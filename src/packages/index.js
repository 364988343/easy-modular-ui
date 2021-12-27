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
import Print from './utils/print'
import extensions from './utils/extensions'

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

import './styles/app.scss'
import './styles/theme/element/index.css'

export default {
  //安装插件
  use: async (app) => {
    // 回调方法
    let callbacks = []
    // 全局组件
    let globalComponents = []

    // 将lodash添加到Vue的实例属性
    Vue.prototype.$_ = lodash
    // 日期格式化插件
    Vue.prototype.$dayjs = dayjs

    //  注入饿了么框架
    Vue.use(ElementUI)
    //使用视频
    Vue.use(VideoPlayer)

    // 注入v-charts组件
    Vue.use(VCharts)

    // 加载自定义组件
    Vue.use(Components)

    // 注册主组件
    Vue.component('em-app', App)

    // 注册指令
    Vue.use(Directive)

    //过滤器
    Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD') {
      return dayjs(dateStr).format(pattern)
    })

    // 全局混入
    Mixins.global(Vue)

    // 加载模块信息
    app.modules.forEach((m) => {
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
    UseRouter(store, app)

    // 使用打印
    Vue.use(Print)

    // 加载页面数据
    await store.dispatch('app/system/init', app, {
      root: true
    })

    // 加载本地令牌
    store.commit('app/token/load', null, {
      root: true
    })

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

    return {
      router,
      store,
      vm
    }
  }
}

const mixins = Mixins.components
// 导出混入组件、状态实例、路由实例
export { mixins, store, router }
