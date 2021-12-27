<template>
  <div class="em-menus">
    <div class="no-menus" v-if="!menus || menus.length < 1">
      <em-icon name="form" />
      <p>没有菜单</p>
    </div>

    <el-menu v-else ref="menus" :default-active="active" :unique-opened="uniqueOpened" :collapse="collapse" :collapse-transition="false">
      <template v-for="item in menus">
        <menu-item v-if="item.show" :key="item.id" :menu="item" />
      </template>
    </el-menu>
  </div>
</template>
<script>
import MenuItem from './item'
import { mapState } from 'vuex'
export default {
  components: { MenuItem },
  computed: {
    ...mapState('app/sidebar', ['menus', 'collapse']),
    ...mapState('app/skins', ['uniqueOpened']),
    ...mapState('app/user', ['routes']),
    ...mapState('app/page', ['current']),

    active: {
      get() {
        if (this.current.name && this.routes) {
          let routeMenu = this.routes.find((m) => m.routeName === this.current.name)

          if (!routeMenu && this.current.meta && this.current.meta.relateRoute) {
            routeMenu = this.routes.find((m) => m.routeName === this.current.meta.relateRoute)
          }

          if (routeMenu) {
            return routeMenu.id
          }
        }
        return '-1'
      },
      set() {}
    }
  },
  // 监控data中的数据变化
  watch: {
    $route(to, from) {
      if (this.$route.query.id) {
        console.info('加载页面数据')
      }
    }
  },
  mounted() {
    if (this.menus && this.menus.children && this.$refs.menus) {
      this.$refs.menus.open(this.menus[0].id)
    }
  }
}
</script>
