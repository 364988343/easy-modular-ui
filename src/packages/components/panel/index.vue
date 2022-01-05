<template>
  <div :class="class_" :style="style_" v-loading="loading" :element-loading-text="loadingText" :element-loading-background="loadingBackground" :element-loading-spinner="loadingSpinner">
    <!--头部-->
    <header v-if="header" class="em-panel-header">
      <slot name="header">
        <div v-if="icon" class="em-panel-header-icon">
          <em-icon v-if="icon" :name="icon" size="18px" :color="iconColor" />
        </div>
        <!--标题-->
        <div class="em-panel-header-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <!--工具栏之前-->
        <div class="em-panel-header-toolbar-before">
          <slot name="toolbar-before" />
        </div>
        <!--工具栏-->
        <div ref="toolbar" class="em-panel-header-toolbar">
          <!--工具栏插槽-->
          <slot name="toolbar" />
          <!--全屏按钮-->
          <em-button v-if="fullscreen" :icon="fullscreen_ ? 'fullscreen-exit' : 'fullscreen'" @click="onFullscreen" />
          <!--刷新按钮-->
          <em-button v-if="refresh" icon="reload" @click="onRefresh" />
          <!--折叠按钮-->
          <em-button v-if="collapse" :icon="collapse_ ? 'down-circle' : 'up-circle'" @click="onCollapse" />
        </div>
      </slot>
    </header>
    <!--内容-->
    <el-collapse-transition>
      <div class="em-panel-body" v-show="!collapse_">
        <div class="em-panel-content">
          <div class="em-panel-wrapper" v-if="hasScrollbar">
            <em-scrollbar ref="scrollbar" :horizontal="horizontal">
              <slot />
            </em-scrollbar>
          </div>
          <slot v-else />
        </div>
        <footer v-if="footer" :class="['em-panel-footer', footerAlign]">
          <slot name="footer"></slot>
        </footer>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'panel',
  data() {
    return {
      collapse_: false,
      fullscreen_: false
    }
  },
  props: {
    //标题
    title: String,
    //图标
    icon: String,
    //图标颜色
    iconColor: {
      type: String,
      default: '#000000'
    },
    //是否显示头部
    header: Boolean,
    //是否显示底部
    footer: Boolean,
    //底部对齐方式(left/center/right)
    footerAlign: {
      type: String,
      default: 'right'
    },
    //是否页模式
    page: Boolean,
    //高度
    height: String,
    //没有内边距
    noPadding: Boolean,
    //没有边框
    noBorder: Boolean,
    //标题是否加粗
    titleBold: Boolean,
    //不显示滚动条
    noScrollbar: Boolean,
    //是否显示水平滚动条
    horizontal: Boolean,
    //加载动画显示
    loading: Boolean,
    //是否显示全屏按钮
    fullscreen: Boolean,
    //是否显示折叠按钮
    collapse: Boolean,
    //是否显示刷新按钮
    refresh: Boolean
  },
  computed: {
    ...mapState('app/loading', { loadingText: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    class_() {
      let classArr = ['em-panel', this.fontSize]
      if (this.height) classArr.push('has-height')
      if (this.page) classArr.push('page')
      if (this.fullscreen_) classArr.push('fullscreen')
      if (this.noPadding) classArr.push('no-padding')
      if (!this.noBorder) classArr.push('border')
      if (this.titleBold) classArr.push('title-bold')

      return classArr
    },
    style_() {
      let style = { height: this.height }
      return style
    },
    hasScrollbar() {
      return !this.noScrollbar && (this.height || this.page)
    }
  },
  methods: {
    /**
     * @description:开启全屏
     * @param {*}
     */
    openFullscreen() {
      this.fullscreen_ = true
      this.$emit('fullscreen-change', this.fullscreen_)
    },

    /**
     * @description: 关闭全屏
     * @param {*}
     */
    closeFullscreen() {
      this.fullscreen_ = false
      this.$emit('fullscreen-change', this.fullscreen_)
    },

    /**
     * @description:折叠事件
     * @param {*}
     */
    onCollapse() {
      this.collapse_ = !this.collapse_
      if (this.collapse_) {
        this.class_.push('no-height')
      } else {
        const index = this.class_.findIndex((m) => m === 'no-height')
        this.class_.splice(index, 1)
      }
      this.$emit('collapse-change', this.collapse_)
    },

    /**
     * @description: 全屏事件
     * @param {*}
     */
    onFullscreen() {
      if (this.fullscreen_) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    },

    /**
     * @description: 刷新
     * @param {*}
     */
    /**  */
    onRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>
