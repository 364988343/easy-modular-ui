<template>
  <div class="em-main-header-toolbar">
    <div class="em-main-header-toolbar-search">
      <em-autocomplete v-model="searchMenu" value-key="name" label-keys="name" :action="getMenus" @select="onSelectMenu" placeholder="请输入功能名称....">
        <template v-slot:suffix>
          <i class="el-icon-search el-input__icon"></i>
        </template>
      </em-autocomplete>
    </div>
    <div class="em-main-header-toolbar-item" @click="releaselogShow = true">
      <em-icon class="em-main-header-toolbar-item-icon" name="info-circle" />
    </div>

    <div class="em-main-header-toolbar-item" @click="onSkinToggle">
      <em-icon class="em-main-header-toolbar-item-icon" name="skin" />
    </div>

    <el-dropdown trigger="click">
      <div class="em-main-header-toolbar-item">
        <em-icon class="em-main-header-toolbar-item-icon" name="user" />
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <em-button type="text" text="个人信息" icon="user" @click="userDialogShow = true" />
        </el-dropdown-item>
        <el-dropdown-item>
          <em-button type="text" text="修改密码" icon="password" @click="passwordDialogShow = true" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="em-main-header-toolbar-item" @click="toggle">
      <em-icon class="em-main-header-toolbar-item-icon" :name="fullscreenIcon" />
    </div>

    <div class="em-main-header-toolbar-item" @click="onLogout">
      <em-icon class="em-main-header-toolbar-item-icon" name="logout" />
    </div>

    <!--系统信息-->
    <em-release-log :visible.sync="releaselogShow"></em-release-log>
    <!--切换主题-->
    <em-skin-toggle :visible.sync="skinDialogShow"></em-skin-toggle>
    <!--用户信息-->
    <em-user-info :visible.sync="userDialogShow"></em-user-info>
    <!--修改密码-->
    <em-password-update :visible.sync="passwordDialogShow"></em-password-update>
  </div>
</template>

<script>
import { openMenu } from '../../../../utils/menu'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      //搜索的菜单
      searchMenu: '',
      //皮肤窗口
      skinDialogShow: false,
      //用户窗口
      userDialogShow: false,
      //修改密码窗口
      passwordDialogShow: false,
      //发布记录窗口
      releaselogShow: false
    }
  },
  computed: {
    ...mapState('app/fullscreen', ['active']),
    ...mapState('app/user', { menus: (s) => s.routes }),
    fullscreenIcon() {
      return this.active ? 'fullscreen-exit' : 'fullscreen'
    }
  },
  methods: {
    ...mapActions('app/fullscreen', ['toggle']),
    ...mapActions('app/system', ['logout']),
    /**
     * @description: 切换主题
     */
    onSkinToggle() {
      this.skinDialogShow = true
    },

    /**
     * @description: 获取菜单
     * @param {*}
     */
    getMenus(queryString) {
      return new Promise((resolve) => {
        let data = []
        if (!queryString) data = this.menus.slice(0, 10)
        resolve(data)
      })
    },

    /**
     * @description: 选择菜单
     * @param {*}
     */
    onSelectMenu(menu) {
      openMenu(this.$router, menu)
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
  }
}
</script>
