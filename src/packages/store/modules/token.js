import t from '../../utils/token'

const state = {
  //请求令牌
  accessToken: '',
  //刷新令牌
  refreshToken: ''
}

const mutations = {
  /**
   * @description: 初始化
   * @param {*} state
   * @param {*} token
   */
  init(state, token) {
    t.set(token)
    Object.assign(state, token)
  },

  /**
   * @description: 加载
   * @param {*} state
   */
  load(state) {
    const token = t.get()
    if (token) {
      Object.assign(state, token)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
