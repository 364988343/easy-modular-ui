<template>
  <div class="em-main-header">
    <!--logo-->
    <div class="em-main-header-logo">
      <img :src="logo" class="em-main-header-logo-img" :alt="logo" :title="title" />
      <div class="em-main-header-logo-text">{{ title }}</div>
    </div>
    <!--导航栏-->
    <div class="em-main-header-nav">
      <ul>
        <template v-for="menu in menus">
          <li :class="['em-main-header-nav-item', menu.id === curr ? 'active' : '']" :key="menu.id">
            <a href="javascript:void(0)" @click.prevent="onNavClick(menu)">
              <em-icon class="em-main-header-nav-item-icon" :name="menu.icon" :style="{ color: menu.iconColor }" />
              <span class="em-main-header-nav-item-text">{{ menu.name }}</span>
            </a>
          </li>
        </template>
      </ul>
    </div>
    <!--工具栏-->
    <div class="em-main-header-toolbar">
      <em-button type="text" @click="onSkinToggle">
        <em-icon name="skin" />
      </em-button>
      <el-dropdown trigger="click">
        <em-button type="text">
          <em-icon name="user" />
        </em-button>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <em-button type="text" text="个人信息" icon="user" @click="userDialogShow = true" />
          </el-dropdown-item>
          <el-dropdown-item>
            <em-button type="text" text="修改密码" icon="password" @click="passwordDialogShow = true" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <em-button type="text" @click="toggle">
        <em-icon :name="fullscreenIcon" />
      </em-button>
      <em-button type="text" @click="onLogout">
        <em-icon name="logout" />
      </em-button>
    </div>

    <!--切换主题-->
    <skin-toggle :visible.sync="skinDialogShow"></skin-toggle>
    <!--用户信息-->
    <em-user-info :visible.sync="userDialogShow"></em-user-info>
    <!--修改密码-->
    <em-password-update :visible.sync="passwordDialogShow"></em-password-update>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { open } from '../../../../utils/menu'
import SkinToggle from '../../../skin-toggle/index'

export default {
  components: { SkinToggle },
  data() {
    return {
      curr: '',
      skinDialogShow: false,
      userDialogShow: false,
      passwordDialogShow: false
    }
  },
  computed: {
    ...mapState('app/system', ['title', 'logo']),
    ...mapState('app/user', { menus: (s) => s.userData.menus, routes: (s) => s.routes }),
    ...mapState('app/page', ['current']),
    ...mapState('app/fullscreen', ['active']),
    fullscreenIcon() {
      return this.active ? 'fullscreen-c' : 'fullscreen-o'
    }
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
      // 节点类型
      if (menu.type === 0) {
        if (menu.children) {
          this.setMenus(menu.children)
          if (menu.url && this.$router.history.current.path != menu.url) {
            this.$router.push(menu.url)
          }
        } else {
          this.setMenus([])
        }
      } else {
        open(this.$router, menu)
      }
    },
    /**
     * @description: 切换主题
     */
    onSkinToggle() {
      this.skinDialogShow = true
    },

    /**
     * @description: 退出登录
     */
    onLogout() {
      this._confirm('您确认要退出登录吗').then(() => {
        this.logout()

        // 跳转到登录页面
        this.$router.push({
          name: 'login',
          query: {
            redirect: this.$route.fullPath
          }
        })
      })
    }
  },
  watch: {
    current() {
      if (this.current.name && this.routes) {
        let routeMenu = this.routes.find((m) => m.routenName === this.current.name)
        if (routeMenu) {
          for (var i = 0; i < this.menus.length; i++) {
            if (this.menus[i].id === routeMenu.menu.rootId) {
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
  }
}
</script>
