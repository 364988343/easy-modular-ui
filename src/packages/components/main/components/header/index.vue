<template>
  <div class="em-main-header">
    <!--logo-->
    <div class="em-main-header-logo">
      <img :src="config.logo" class="em-main-header-logo-img" :alt="config.logo" :title="config.title" />
      <div class="em-main-header-logo-text">
        {{ config.title }}<label class="em-main-header-logo-text-enterprise" v-if="user.tenantName">[{{ user.tenantName }}]</label>
      </div>
    </div>
    <!--导航栏-->
    <div class="em-main-header-nav">
      <header-nav-item v-for="menu in menus" :key="menu.id" :data="menu" :active="menu.id === curr" @click="onNavClick"></header-nav-item>
    </div>
    <!--工具栏-->
    <header-toolbar></header-toolbar>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { openMenu } from '../../../../utils/menu'
import headerNavItem from './nav-item'
import headerToolbar from './toolbar'
import cache from '../../../../utils/cache'

export default {
  components: { headerNavItem, headerToolbar },
  data() {
    return {
      curr: '',
    }
  },
  computed: {
    ...mapState('app/system', { config: (s) => s.config, version: (s) => s.config.version }),
    ...mapState('app/user', { menus: (s) => s.menus, routes: (s) => s.routes }),
    ...mapState('app/page', ['current'])
  },
  methods: {
    ...mapMutations('app/sidebar', ['setMenus']),
    ...mapActions('app/fullscreen', ['toggle']),
    ...mapActions('app/system', ['logout']),
    /**
     * @description: 点击导航菜单
     * @param {*} menu
     */
    onNavClick(menu) {
      this.curr = menu.id
      const chilMenus = menu.children ? menu.children : []
      this.setMenus(chilMenus)
      if (menu.type != 0) {
        openMenu(this.$router, menu)
      }
    }
  },
  watch: {
    current() {
      if (this.current.name === 'home' && this.menus) {
        this.curr = this.menus[0].id
        this.setMenus(this.menus[0].children)
        return
      }

      if (this.current.name && this.routes) {
        let routeMenu = this.routes.find((m) => m.routeName === this.current.name)
        if (routeMenu) {
          for (var i = 0; i < this.menus.length; i++) {
            if (this.menus[i].id == routeMenu.rootId) {
              this.curr = this.menus[i].id
              this.setMenus(this.menus[i].children)
              break
            }
          }
        }
      }
    }
  },
  created() {
    //默认展示第一个
    if (this.menus && this.menus.length > 0) {
      this.curr = this.menus[0].id
      this.setMenus(this.menus[0].children)
    }
    setTimeout(() => {
      //系统信息窗口是否显示
      const key = `view-release-${this.user.id}`
      this.releaselogShow = cache.get(key) === this.version ? false : true
    }, 1000)
  }
}
</script>
