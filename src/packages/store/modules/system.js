import _ from 'lodash'
import token from '../../utils/token'

const state = {
  //模块
  modules: [],
  //配置
  config: {
    //标题
    title: 'Easy-Modular-UI',
    //logo
    logo: '',
    //首页
    home: '',
    //登录页
    login: '',
    //版本
    version: '',
    //版权声明
    copyright: ''
  },
  //方法集合
  actions: {
    //身份认证
    auth: {
      //刷新令牌
      refreshToken: null,
      //获取认证信息
      getAuthInfo: null
    },
    //修改密码
    updatePassword: null,
    //保存皮肤配置信息
    saveSkin: null,
    //获取发布记录
    getReleaseLog: null
  },
  //服务地址
  serviceUrl: ''
}

const getters = {
  logoUrl: (s) => {
    return s.config.logoUrl || './images/logo.png'
  }
}

const mutations = {
  /**
   * @description: 初始化
   * @param {*} state
   * @param {*} app
   */
  init(state, app) {
    _.merge(state, app)
    if (!state.config.logo) {
      state.config.logo = './images/logo.png'
    }
  }
}

const actions = {
  /**
   * @description: 初始化
   * @param {*} commit
   * @param {*} dispatch
   * @param {*} app
   */
  async init({ commit, dispatch }, app) {
    commit('init', app)
    // 配置页面信息
    await dispatch('app/page/load', null, { root: true })
  },

  /**
   * @description: 登录
   * @param {*} state
   * @param {*} params
   */
  login({ state }, params) {
    return state.actions.auth.login(params)
  },

  /**
   * @description 退出
   */
  async logout({ dispatch }) {
    // 删除令牌
    token.remove()

    // 账号退出
    dispatch('app/user/logout', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
