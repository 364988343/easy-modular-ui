/*
 * @Author: 陈曦
 * @Date: 2021-04-21 08:46:00
 * @Description: 侧边栏
 */

const state = {
  //菜单
  menus: [],
  //折叠
  collapse: false
}

const mutations = {
  /**
   * @description: 设置菜单
   * @param {Object} state vuex state
   * @param {Array} menus 菜单
   */
  setMenus(state, menus) {
    state.menus = menus
  },
  /**
   * @description: 折叠设置
   * @param {Object} state vuex state
   * @param {Boolean} collapse 是否折叠
   */
  collapseSet(state, collapse) {
    state.collapse = collapse
  }
}

const actions = {
  /**
   * @description 切换折叠状态
   */
  toggle({ state, commit }) {
    commit('collapseSet', !state.collapse)
  },
  /**
   * @description 隐藏
   */
  hide({ commit }) {
    commit('collapseSet', false)
  },
  /**
   * @description 显示
   */
  show({ commit }) {
    commit('collapseSet', true)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
