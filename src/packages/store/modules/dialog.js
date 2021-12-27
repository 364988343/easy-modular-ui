const state = {
  id: 1000
}

const mutations = {
  /**
   * @description 设置 dialog id
   */
  setId(state) {
    state.id++
  }
}

const actions = {
  /**
   * @description: 打开窗口
   * @param {*} state
   * @param {*} commit
   */
  open({ state, commit }) {
    commit('setId')
    return state.id
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

