import cache from '../../utils/cache'

/**
 * @description 页面是否缓存
 * @param {Object} page
 */
const isCache = (page) => {
  return !page.meta || page.meta.cache !== false
}
/**
 * @description 页面是否在框架中显示
 * @param {Object} page
 */
const isFrameIn = (page) => {
  return !page.meta || page.meta.frameIn !== false
}

const state = {
  //缓存key
  cacheKey: 'tabnav',
  //已打开页面
  opened: [],
  //当前页面
  current: {},
  //缓存页面
  keepAlive: [],
  //默认页面
  default: ''
}

const mutations = {
  /**
   * @description 初始化
   * @param {Object} state vuex state
   * @param {Array} opened 已打开的页面
   */
  init(state, opened) {
    state.opened = opened
  },

  /**
   * @description 设置默认页
   * @param {Object} state vuex state
   * @param {String} url 链接
   */
  defaultSet(state, url) {
    state.default = url
  },

  /**
   * @description 设置当前页
   * @param {Object} state vuex state
   * @param {String} url 链接
   */
  currentSet(state, current) {
    state.current = current
  },

  /**
   * @description: 添加一个页面
   * @param {Object} state vuex state
   * @param {Object} page 页面
   */
  add(state, page) {
    state.opened.push(page)
  },

  /**
   * @description 删除一个页面
   * @param {Object} state vuex state
   * @param {Number} index 下标
   */
  remove(state, index) {
    state.opened.splice(index, 1)
  },

  /**
   * @description 从已经打开的页面记录中更新需要缓存的页面记录
   * @param {Object} state vuex state
   */
  keepAliveRefresh(state) {
    state.keepAlive = state.opened.filter((item) => item.meta.cache !== false).map((e) => e.name)
  },

  /**
   * @description 删除一个页面的缓存设置
   * @param {Object} state vuex state
   * @param {String} name name
   */
  keepAliveRemove(state, name) {
    const list = [...state.keepAlive]
    const index = list.findIndex((item) => item === name)

    if (index > -1) {
      list.splice(index, 1)
      state.keepAlive = list
    }
  },

  /**
   * @description 增加一个页面的缓存设置
   * @param {Object} state vuex state
   * @param {String} name 页面
   */
  keepAlivePush(state, name) {
    if (state.keepAlive.indexOf(name) < 0) {
      state.keepAlive.push(name)
    }
  },
  /**
   * @description 清空页面缓存设置
   * @param {Object} state vuex state
   */
  keepAliveClean(state) {
    state.keepAlive = []
  },

  /**
   * @description: 设置页签
   * @param {Object} state vuex state
   * @param {String} name 页面
   */
  setTabName(state, name) {
    if (!state.current || !state.opened) return
    let page = state.opened.find((p) => p.path === state.current.path)
    if (page) page.tabName = name
  },

  /**
   * @description: 重置
   *  @param {Object} state vuex state
   */
  reset(state) {
    state.opened = []
    state.keepAlive = []
    if (state.current && !state.current.isDefault) {
      state.current = {}
    }
  }
}

const actions = {
  /**
   * @description 从本地数据中读取已打开的页面数据
   * @param {Object} config 配置信息
   * @param {Object} routes 路由列表
   */
  async load({ rootState, commit, dispatch }) {
    const opened = await dispatch('cacheLoad')
    // 初始
    if (opened) {
      commit('init', opened)
      // 缓存刷新
      commit('keepAliveRefresh')
    }

    const defaultPage = rootState.app.system.config.home || '/'
    commit('defaultSet', defaultPage)
  },

  /**
   * @description 打开页面
   * @param {Object} route 路由信息
   */
  async open({ state, commit, dispatch, rootState }, route) {
    //如果是默认页直接返回
    const defaultPage = rootState.app.system.config.home || '/'
    if (defaultPage.toLowerCase() === route.path.toLowerCase()) {
      if (isCache(route)) commit('keepAlivePush', route.name)

      commit('currentSet', {
        name: route.name,
        path: state.default,
        isDefault: true
      })
      return
    }

    //判断是否超出最大可打开页面数，如果超出，从前面删除超出的页面
    const maxOpenCount = rootState.app.skins.maxOpenCount
    if (maxOpenCount > 0 && state.opened.length > maxOpenCount - 1) {
      let removeCount = state.opened.length - maxOpenCount
      for (let i = 0; i <= removeCount; i++) {
        const page = state.opened[0]
        commit('remove', 0)
        if (isCache(page) === true) {
          commit('keepAliveRemove', page.name)
        }
      }

      dispatch('cacheInsert')
    }

    // 不在框架中显示的页面，直接返回
    if (!isFrameIn(route)) return

    const page = {
      name: route.name,
      path: decodeURI(route.path),
      fullPath: route.fullPath,
      meta: route.meta,
      query: route.query,
      params: route.params,
      icon: route.meta.icon,
      tabName: route.params.tn_ || route.query.tn_ || route.meta.title
    }
    //菜单图标赋值
    const currentRoute = rootState.app.user.routes.find((m) => m.routeName === route.name)
    if (currentRoute) page.icon = currentRoute.icon

    // 内嵌链接
    if (route.name === '_iframe') {
      page.meta = {
        title: route.query.title
      }
    }

    page.tabName = page.tabName || '未命名'
    const notOpend = state.opened.every((p) => p.path !== page.path)

    // 如果当前页面未打开, 加入已打开列表
    if (notOpend) {
      // 已打开列表
      commit('add', page)
      // 判断是否缓存
      if (isCache(page)) commit('keepAlivePush', page.name)
      //更新缓存
      cache.set(state.cacheKey, state.opened)
    }

    commit('currentSet', page)
  },

  /**
   * @description 关闭标签
   * @param {String} path 页面的路径
   * @param {Object} router 路由对象
   */
  async close({ state, commit, dispatch }, { index, router, to }) {
    let newPage = to
    const page = state.opened[index]
    if (index > -1) {
      if (!to || Object.keys(to).length === 0) {
        // 如果关闭的页面就是当前显示的页面
        if (state.current.path === page.path) {
          // 打开一个新的页面
          if (index > 0) {
            newPage = state.opened[index - 1]
          } else {
            newPage = state.default
          }
        }
      }
      commit('remove', index)
      dispatch('cacheInsert')

      if (isCache(page) === true) {
        commit('keepAliveRemove', page.name)
      }
    }

    if (newPage) router.push(newPage)
  },

  /**
   * @description 关闭左侧标签
   * @param {String} path 选择的页面路径
   * @param {Object} router 路由对象
   */
  closeLeft({ state, commit, dispatch }, { index, router }) {
    if (index > 0) {
      const page = state.opened[index]
      state.opened.splice(0, index).forEach((item) => {
        if (isCache(item) === true) commit('keepAliveRemove', item.name)

        //如果关闭的页面包括当前打开的页面，则跳转到选择的页
        if (item === state.current) router.push(page)
      })

      dispatch('cacheInsert')
    }
  },

  /**
   * @description 关闭右侧标签
   * @param {String} path 选择的页面路径
   * @param {Object} router 路由对象
   */
  closeRight({ state, commit, dispatch }, { index, router }) {
    if (index < state.opened.length - 1) {
      const page = state.opened[index]
      state.opened.splice(index + 1).forEach((item) => {
        if (isCache(item) === true) commit('keepAliveRemove', item.name)

        //如果关闭的页面包括当前打开的页面，则跳转到选择的页
        if (item.path === state.current.path) router.push(page)
      })
      dispatch('cacheInsert')
    }
  },

  /**
   * @description 关闭其它标签
   * @param {String} path 选择的页面路径
   * @param {Object} router 路由对象
   */
  closeOther({ state, commit, dispatch }, { index, router }) {
    if (index > -1) {
      const page = state.opened[index]
      // 删除右侧
      state.opened.splice(index + 1).forEach((item) => {
        if (isCache(item) === true) commit('keepAliveRemove', item.name)

        //如果关闭的页面包括当前打开的页面，则跳转到选择的页
        if (item.path === state.current.path) router.push(page)
      })
      // 删除左侧
      state.opened.splice(0, index).forEach((item) => {
        if (isCache(item) === true) commit('keepAliveRemove', item.name)

        //如果关闭的页面包括当前打开的页面，则跳转到选择的页
        if (item.path === state.current.path) {
          router.push(page)
        }
      })
      dispatch('cacheInsert')
    } else {
      dispatch('closeAll')
    }
  },

  /**
   * @description 关闭所有标签
   * @param {String} path 选择的页面路径
   * @param {Object} router 路由对象
   */
  closeAll({ commit, dispatch }, { router }) {
    commit('init', [])
    commit('keepAliveClean')
    dispatch('cacheInsert')
    // 跳转到首页
    router.push('/')
  },

  /**
   * @description 缓存插入
   */
  cacheInsert({ state }) {
    cache.set(state.cacheKey, state.opened)
  },
  /**
   * @description 缓存加载
   */
  cacheLoad({ state }) {
    return cache.get(state.cacheKey)
  },
  /**
   * @description 缓存清除
   */
  cacheClear({ state }) {
    cache.set(state.cacheKey, [])
  },

  /**
   * @description: 设置标签名称
   * @param {*}
   */
  setTabName({ commit }, tabName) {
    if (tabName) {
      commit('setTabName', tabName)
    }
  },

  /**
   * @description: 重置
   * @param {*}
   */
  reset({ commit }) {
    commit('reset')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
