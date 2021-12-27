<template>
  <div class="em-tabnav">
    <slot name="before" />
    <div class="em-tabnav-tabs">
      <el-tabs :value="current.path" type="card" :closable="true" @tab-click="onTabClick" @tab-remove="onTabRemove">
        <el-tab-pane :name="defaultPage">
          <span slot="label"> <em-icon name="home" /><label class="em-tabnav-tabs-txt">首页</label> </span>
        </el-tab-pane>
        <el-tab-pane v-for="(item, i) in opened" :key="i" :name="item.path">
          <span slot="label" :index="i">
            <em-icon :name="item.icon" @contextmenu.prevent="showContextMenu" />
            <label class="em-tabnav-tabs-txt" @contextmenu.prevent="showContextMenu"> {{ item.tabName }}</label>
          </span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--控制页签-鼠标右键-->
    <div class="em-tabnav-control">
      <el-dropdown @command="(cmd) => handleCommand(cmd)">
        <span class="em-tabnav-control-btn">
          <em-icon name="down-square" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Left"> <em-icon name="doubleleft" class="em-tabnav-control-icon" />关闭左侧 </el-dropdown-item>
          <el-dropdown-item command="Right"> <em-icon name="doubleright" class="em-tabnav-control-icon" />关闭右侧 </el-dropdown-item>
          <el-dropdown-item command="Other"> <em-icon name="disconnect" class="em-tabnav-control-icon" />关闭其他 </el-dropdown-item>
          <el-dropdown-item command="All"> <em-icon name="app" class="em-tabnav-control-icon" />全部关闭 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--控制页签-下拉-->
    <div ref="contextmenu" class="em-tabnav-contextmenu" v-show="contextmenu.visible" :style="{ top: contextmenu.top, left: contextmenu.left }">
      <ul>
        <li @click.stop="onRefresh"><em-icon name="reload" />重新载入</li>
        <li @click.stop="onClose('')"><em-icon name="close" />关闭</li>
        <li @click.stop="onClose('Left')"><em-icon name="doubleleft" />关闭左侧</li>
        <li @click.stop="onClose('Right')"><em-icon name="doubleright" />关闭右侧</li>
        <li @click.stop="onClose('Other')"><em-icon name="disconnect" />关闭其它</li>
        <li @click.stop="onClose('All')"><em-icon name="app" />关闭全部</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { on, off, hasClass } from '../../utils/dom'
export default {
  name: 'tabnav',
  data() {
    return {
      contextmenu: {
        visible: false,
        top: 0,
        left: 0
      },
      closeParams: { index: 0, router: this.$router }
    }
  },
  computed: {
    ...mapState('app/page', { opened: 'opened', current: 'current', defaultPage: 'default' })
  },
  methods: {
    ...mapActions('app/page', ['close', 'closeLeft', 'closeRight', 'closeOther', 'closeAll']),

    /**
     * @description: 显示页签控制栏
     * @param {*} event
     */
    showContextMenu(event) {
      this.contextmenu = {
        visible: true,
        top: event.y + 'px',
        left: event.x + 'px'
      }
      this.closeParams.index = parseInt(event.target.parentNode.getAttribute('index'))
    },


    /**
     * @description: 隐藏页签控制栏
     * @param {*} e
     */
    hideContextMenu(e) {
      const { target } = e || window.event
      if (this.$refs.contextmenu !== target) this.contextmenu.visible = false
    },

    /**
     * @description 处理关闭标签下拉菜单命令
     * @param {String} cmd 命令
     * @param {String} tagName 选择的标签名称
     */
    handleCommand(cmd) {
      this.closeParams.index = this.opened.findIndex((m) => m.path === this.current.path)
      this.onClose(cmd)
    },

    /**
     * @description: 点击页签
     * @param {*} tab
     */
    onTabClick(tab) {
      if (tab.name === this.defaultPage && this.current.path !== this.defaultPage) {
        this.$router.push(this.defaultPage)
        return
      }
      if (this.current.path === tab.name) return
      const page = this.opened.find((page) => page.path === tab.name)
      if (page) {
        const { name, params, query } = page
        this.$router.push({ name, params, query })
      }
    },

    /**
     * @description: 移除页签
     * @param {*} path
     */
    onTabRemove(path) {
      this.closeParams.index = this.opened.findIndex((m) => m.path === path)
      this.onClose()
    },

    /**
     * @description: 关闭页签
     * @param {*} type
     */
    onClose(type) {
      this[`close${type || ''}`](this.closeParams)
    },

    /**
     * @description: 重新载入
     * @param {*}
     */
    onRefresh() {
      this.reload(this.current.name)
    }
  },
  watch: {
    'contextmenu.visible'(val) {
      if (val) {
        on(document, 'mouseup', this.hideContextMenu)
      } else {
        off(document, 'mouseup', this.hideContextMenu)
      }
    }
  }
}
</script>
