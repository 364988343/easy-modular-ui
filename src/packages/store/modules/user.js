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
  //用户编号
  userId: '',
  //用户编码
  userCode: '',
  //用户姓名
  userName: '',
  //性别
  sex: '',
  //职位
  jobName: '',
  //角色编码
  roleCodes: '',
  //角色名称
  roleNames: '',
  //租户Id
  tenantId: '',
  //租户名称
  tenantName: '',
  //租户类别
  tenantType: '',
  //菜单列表
  menus: [],
  //路由
  routes: [],
  //权限列表
  permissions: [],
  //额外数据
  extraData: ''
}

const getters = {
  routeNames: (s) => {
    return s.routes.map((m) => m.routeName)
  }
}

const mutations = {
  /**
   * @description: 初始化
   * @param {*} state
   * @param {*} user
   */
  init(state, user) {
    Object.assign(state, user)

    resolveRouteMenus(user.menus)
    state.routes = routeMenus
  },

  /**
   * @description: 重置
   * @param {*} state
   */
  reset(state) {
    state.id = ''
    state.userCode = ''
    state.userName = ''
  }
}

const actions = {
  /**
   * @description 初始化
   */
  async init({ state, rootState, commit, dispatch }) {
    if (state.userId) return

    try {
      const authInfo = await rootState.app.system.actions.auth.getAuthInfo()

      // 设置皮肤
      dispatch('app/skins/init', authInfo.skin, {
        root: true
      })

      // 初始化
      commit('init', authInfo)

      const userId = await dispatch('getUserIdByCache')
      // 如果账户变了，则需要清除原有的一些数据
      if (authInfo.userId !== userId) {
        dispatch('app/page/reset', null, {
          root: true
        })
      }

      dispatch('setUserIdByCache')
    } catch (err) {
      console.error(err)
      //如果请求失败则退出
      dispatch('app/system/logout', null, {
        root: true
      })
    }
  },

  /**
   * @description 重载用户信息
   */
  async reload({ state, rootState, commit, dispatch }) {
    try {
      const authInfo = await rootState.app.system.actions.auth.getAuthInfo()
      commit('init', authInfo)
    } catch (err) {
      console.error(err)
      //如果请求失败则退出
      dispatch('app/system/logout', null, {
        root: true
      })
    }
  },

  /**
   * @description 退出
   */
  logout({ commit }) {
    commit('reset')
  },

  /**
   * @description: 从缓存中获取用户Id
   * @param {*}
   */
  getUserIdByCache() {
    return cache.get('userId')
  },

  /**
   * @description: 缓存用户Id
   * @param {*} state
   */
  setUserIdByCache({ state }) {
    cache.set('userId', state.userId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
