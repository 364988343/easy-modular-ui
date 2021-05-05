/*
 * @Author: 陈曦
 * @Date: 2021-04-20 08:33:59
 * @Description: 系统
 */
import cache from '../../utils/cache'
const prefix = 'system_'

const state = {
  //标题
  title: cache.get(`${prefix}_title`) || 'Easy-Modular-UI',
  //logo
  logo: cache.get(`${prefix}_logo`) || './images/logo.png',
  //首页
  home: cache.get(`${prefix}_home`) || '',
  //登录页
  login: cache.get(`${prefix}_login`) || '',
  //版权声明
  copyright: cache.get(`${prefix}_copyright`) || '',
  //刷新token路径
  refreshTokenUrl: cache.get(`${prefix}_refreshTokenUrl`) || ''
}

const mutations = {
  /**
   * @description:标题赋值
   */
  setTitle(state, data) {
    cache.set(`${prefix}_title`, data)
    state.title = data
  },

  /**
   * @description:logo赋值
   */
  setLogo(state, data) {
    cache.set(`${prefix}_logo`, data)
    state.logo = data
  },

  /**
   * @description:首页赋值
   */
  setHome(state, data) {
    cache.set(`${prefix}_home`, data)
    state.home = data
  },

  /**
   * @description:登录页赋值
   */
  setLogin(state, data) {
    cache.set(`${prefix}_login`, data)
    state.login = data
  },

  /**
   * @description:版权声明赋值
   */
  setCopyright(state, data) {
    cache.set(`${prefix}_copyright`, data)
    state.copyright = data
  },

  /**
   * @description:刷新赋值
   */
  setRefreshTokenUrl(state, data) {
    cache.set(`${prefix}_refreshTokenUrl`, data)
    state.refreshTokenUrl = data
  }
}

const actions = {
  /**
   * @description: 系统初始化
   */
  async init({ commit, dispatch }, data) {
    commit('setTitle', data.title)
    commit('setLogo', data.logo)
    commit('setHome', data.home)
    commit('setLogin', data.lgoin)
    commit('setCopyright', data.copyright)
    commit('setRefreshTokenUrl', data.refreshTokenUrl)
    // 配置页面信息
    await dispatch('app/page/load', null, { root: true })
  },
  /**
   * @description 退出
   */
  async logout({ dispatch }) {
    // 账号退出
    dispatch('app/user/logout', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
