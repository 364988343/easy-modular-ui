/*
 * @Author: 陈曦
 * @Date: 2021-04-24 17:48:51
 * @Description: 混入
 */

import message from './global/message'
import _loading from './global/loading'
import setTabName from './global/setTabName'
import fontSize from './global/fontSize'

import visible from './components/visible'
import select from './components/select'
import formDialogEdit from './components/form-dialog-edit'
import formReadonly from './components/form-readonly'
import formSave from './components/form-save'
import list from './components/list'
export default {
  global(Vue) {
    // 消息提示
    Vue.mixin(message)
    // 设置loading
    Vue.mixin(_loading)
    //设置标签导航名称
    Vue.mixin(setTabName)
    //字体大小
    Vue.mixin(fontSize)
  },
  components: {
    visible,
    select,
    formDialogEdit,
    formReadonly,
    formSave,
    list
  }
}
