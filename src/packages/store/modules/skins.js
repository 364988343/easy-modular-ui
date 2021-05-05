/*
 * @Author: 陈曦
 * @Date: 2021-04-26 23:45:09
 * @Description: 皮肤
 */

import cache from '../../utils/cache'
const state = {
  //当前主题
  theme: cache.get('theme') || '',
  //字体大小
  fontSize: cache.get('fontSize') || '',
  //最大窗口数量
  maxOpenCount: cache.get('maxOpenCount') || 20,
  //是否只保持一个子菜单的展开
  uniqueOpened: cache.get('uniqueOpened') || true
}

const mutations = {
  /**
   * @description: 主题赋值
   */
  setTheme(state, data) {
    cache.set('theme', data)
    state.theme = data
  },

  /**
   * @description: 字号赋值
   */
  setFontSize(state, data) {
    cache.set('fontSize', data)
    state.fontSize = data
  },

  /**
   * @description: 最大窗口数量赋值
   */
  setMaxOpenCount(state, data) {
    cache.set('maxOpenCount', data)
    state.maxOpenCount = data
  },

  /**
   * @description: 是否只保持一个子菜单的展开赋值
   */
  setUniqueOpened(state, data) {
    cache.set('uniqueOpened', data)
    state.uniqueOpened = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
