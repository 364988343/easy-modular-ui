import Vue from 'vue'
import EasyModularUI from '../packages/index'
import systemService from './_modules/admin/api/system'
import apiConfig from './config/apiConfig'

//模块
import Admin from './_modules/admin'
import Base from './_modules/base'
import Form from './_modules/form'
import Advanced from './_modules/advanced'

import 'highlight.js/styles/darcula.css'
import VueHighlightJS from 'vue-highlightjs'
import Vuep from 'vuep'
import 'vuep/dist/vuep.css'

import './components'

// 代码高亮插件
Vue.use(VueHighlightJS)

// 在线编辑预览代码插件
Vue.use(Vuep)

// 获取系统信息
const system = systemService.get()

system.modules = [Admin, Base, Form, Advanced]

EasyModularUI.use({ system })

EasyModularUI.useHttp(apiConfig)
