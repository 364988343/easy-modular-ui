/*
 * @Author: 陈曦
 * @Date: 2021-04-19 23:17:03
 * @Description: 用户
 */
import cache from '../../utils/cache'

let routeMenus = []
const resolveRouteMenus = (menus) => {
  menus.forEach((m) => {
    if (m.children) {
      resolveRouteMenus(m.children)
    }
    if (m.type === 1) {
      routeMenus.push(m)
    }
  })
}

const state = {
  //请求令牌
  accessToken: cache.get('accessToken') || '',
  //刷新令牌
  refreshToken: cache.get('refreshToken') || '',
  //用户信息
  userData: cache.get('userData') || '',
  //路由
  routes: cache.get('routes') || ''
}

const mutations = {
  /**
   * @description: acessToken赋值
   * @param {*} state
   * @param {*} data
   */
  setAccessToken(state, data) {
    cache.set('accessToken', data)
    state.accessToken = data
  },

  /**
   * @description: refreshToken赋值
   * @param {*} state
   * @param {*} data
   */
  setRefreshToken(state, data) {
    cache.set('refreshToken', data)
    state.refreshToken = data
  },

  /**
   * @description: 用户赋值
   * @param {*} state
   * @param {*} data
   */
  setUserData(state, data) {
    state.userData = data
    resolveRouteMenus(data.menus)
    state.routes = routeMenus
    
    cache.set('userData', data)
    cache.set('routes', routeMenus)
  },

  /**
   * @description: 清空
   * @param {*}
   */
  reset(state) {
    state.acessToken = ''
    state.refreshToken = ''
    state.userData = {}
    cache.remove('accessToken')
    cache.remove('refreshToken')
    cache.remove('userData')
  }
}

const actions = {
  /**
   * @description 退出
   */
  logout({ commit }) {
    commit('reset')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
