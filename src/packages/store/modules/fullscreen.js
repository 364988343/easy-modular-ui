/*
 * @Author: 陈曦
 * @Date: 2021-04-27 00:09:01
 * @Description:全屏
 */
import screenfull from 'screenfull'
const state = {
  // 全屏激活
  active: false
}

const mutations = {
  /**
   * @description 设置 store 里的全屏状态
   */
  set(state, active) {
    state.active = active
  }
}

const actions = {
  /**
   * @description 切换全屏
   */
  toggle({ commit }) {
    return new Promise((resolve) => {
      if (screenfull.isFullscreen) {
        screenfull.exit()
        commit('set', false)
      } else {
        screenfull.request()
        commit('set', true)
      }
      // end
      resolve()
    })
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  