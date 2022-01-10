const state = {
  //主题模式
  themeMode: 'dark',
  //主题颜色
  themeColor: 'theme1',
  //字号
  fontSize: 'small',
  //祭奠模式
  memorial: false,
  //最大窗口数量
  maxOpenCount: 20,
  //是否只保持一个子菜单的展开
  uniqueOpened: true
}

const getters = {
  fontSize(state) {
    return state.current.fontSize
  }
}

const mutations = {
  /**
   * @description 初始化
   * @param {Object} state 状态
   * @param {Object} skin 皮肤
   */
  init(state, skin) {
    if (!skin) {
      skin = {
        themeMode: 'dark',
        themeColor: 'theme1'
      }
    }

    Object.assign(state, skin)
    //设置主题模式
    window.document.documentElement.setAttribute('data-theme-mode', skin.themeMode)
    //设置主题颜色
    window.document.documentElement.setAttribute('data-theme-color', skin.themeColor)
    //祭奠模式
    if (skin && skin.memorial) {
      const html = document.getElementsByTagName('html')[0]
      html.style.filter = 'grayscale(100%)'
    }
  },

  /**
   * @description: 设置主题
   * @param {*} state
   * @param {*} data
   */
  setTheme(state, data) {
    state.themeColor = data
  }
}

const actions = {
  /**
   * @description 初始化皮肤信息
   * @param {*} skin
   */
  init({ commit }, skin) {
    commit('init', skin)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
