import Vue from 'vue'
import EasyModularUI from '../packages/index'

import 'highlight.js/styles/a11y-dark.css'
import VueHighlightJS from 'vue-highlightjs'
import Vuep from 'vuep'
import 'vuep/dist/vuep.css'

import './components'
import app from './app'

// 代码高亮插件
Vue.use(VueHighlightJS)

// 在线编辑预览代码插件
Vue.use(Vuep)

//注入模块
const context = require.context('./_modules', true, /.main.js$/)
context.keys().forEach((m) => {
  app.modules.push(context(m).default)
})

//获取系统配置
const config = $api.admin.system.get()
Object.assign(app.config, config)

//注入应用基本接口
app.actions = {
  //身份认证相关方法
  auth: $api.admin.auth,
  //皮肤保存
  saveSkin: $api.admin.skin.save,
  //获取发布记录
  getreleaseLog: $api.admin.releaseLog.queryAll
}

 EasyModularUI.use(app)

