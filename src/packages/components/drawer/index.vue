<template>
  <div ref="drawer" :class="class_">
    <transition name="fade">
      <div class="em-drawer-modal" @click="onModalClick" v-if="modal" v-show="visible"></div>
    </transition>
    <transition :name="`move-${placement}`">
      <div
        ref="dialog"
        class="em-drawer-dialog"
        :style="{ width: wrapperWidth }"
        v-show="visible"
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-background="loadingBackground"
        :element-loading-spinner="loadingSpinner"
      >
        <!--头部-->
        <header v-if="header" class="em-drawer-header">
          <slot name="header">
            <div v-if="icon" class="em-drawer-header-icon">
              <em-icon v-if="icon" :name="icon" />
            </div>
            <!--标题-->
            <div class="em-drawer-header-title">{{ title }}</div>
            <!--工具栏-->
            <div class="em-drawer-header-toolbar">
              <!--工具栏插槽-->
              <slot name="toolbar" />

              <!--全屏按钮-->
              <em-button v-if="fullscreen" :icon="fullscreen_ ? 'fullscreen-exit' : 'fullscreen'" @click="triggerFullscreen" />
              <!--关闭按钮-->
              <em-button icon="close" @click="close" />
            </div>
          </slot>
        </header>
        <!--body-->
        <div class="em-drawer-body">
          <div class="em-drawer-body-wrapper">
             <slot />
          </div>
        </div>
        <footer v-if="footer" class="em-drawer-footer">
          <slot name="footer"></slot>
        </footer>

        <!--拖拽按钮-->
        <div v-if="draggable" class="em-drawer-drag" :class="{ 'em-drawer-drag-left': placement === 'left' }" @mousedown="onTriggerMousedown">
          <slot name="trigger">
            <trigger />
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { oneOf } from '../../utils/assist'
import { on, off } from '../../utils/dom'

import trigger from './trigger'
export default {
  name: 'Drawer',
  components: { trigger },
  data() {
    return {
      canMove: false,
      fullscreen_: false,
      wrapperWidth: this.width,
      minWidth: 226
    }
  },
  props: {
    //是否显示
    visible: Boolean,
    //是否显示头部
    header: Boolean,
    //是否显示底部
    footer: Boolean,
    //标题
    title: String,
    //图标
    icon: String,
    //位置
    placement: {
      type: String,
      default: 'right',
      validator(value) {
        return oneOf(value, ['left', 'right'])
      }
    },
    //宽度
    width: {
      type: String,
      default: '30%'
    },
    //内边距（默认8px）
    padding: {
      type: [Number, String],
      default: 8
    },
    //是否显示水平滚动条
    horizontal: Boolean,
    //加载动画
    loading: Boolean,
    //是否附加到Body
    appendToBody: Boolean,
    //是否显示模态框
    modal: {
      type: Boolean,
      default: true
    },
    //是否点击模态框关闭抽屉
    modalClickClose: {
      type: Boolean,
      default: true
    },
    //自定义class
    customClass: String,
    //是否显示全屏按钮
    fullscreen: {
      type: Boolean,
      default: true
    },
    //可拖拽
    draggable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('app/loading', { loadingText: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    class_() {
      let classArr = ['em-drawer', this.placement, this.customClass, this.fontSize]
      if (this.fullscreen_) classArr.push('fullscreen')
      if (this.draggable) classArr.push('draggable')
      return classArr
    },
    padding_() {
      return typeof this.padding === 'number' ? this.padding + 'px' : this.padding
    }
  },
  methods: {
    /**
     * @description: 附加
     * @param {*}
     */
    append() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
      // 设置内边距
      if (this.padding) {
        this.$refs.drawer.querySelector('.em-drawer-body-wrapper').style.padding = this.padding_
      }
    },

    /**
     * @description: 关闭
     * @param {*}
     */
    close() {
      this.$emit('update:visible', false)
    },

    /**
     * @description: 开启全屏
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
    /**  */
    closeFullscreen() {
      this.fullscreen_ = false
      this.$emit('fullscreen-change', this.fullscreen_)
    },

    /**
     * @description: 全屏事件
     * @param {*}
     */
    triggerFullscreen() {
      this.fullscreen_ ? this.closeFullscreen() : this.openFullscreen()
    },

    /**
     * @description: 点击模态窗口
     * @param {*}
     */
    onModalClick() {
      if (this.modal && this.modalClickClose) {
        this.close()
      }
    },

    /**
     * @description:拖拽按钮鼠标按下事件
     * @param {*}
     */
    onTriggerMousedown() {
      if (!this.draggable) return
      this.canMove = true
      // 防止鼠标选中抽屉中文字，造成拖动trigger触发浏览器原生拖动行为
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
      on(document, 'mousemove', this.onMousemove)
      on(document, 'mouseup', this.onMouseup)
    },

    /**
     * @description: 鼠标离开事件
     * @param {*} event
     */
    onMousemove(event) {
      if (!this.canMove || !this.draggable) return
      const { width, x } = this.$el.getBoundingClientRect()
      let wrapperWidth
      if (this.placement === 'right' && event.pageX - x > 20) {
        wrapperWidth = width + x - event.pageX
      } else if (this.placement === 'left' && event.pageX - x < width - 20) {
        wrapperWidth = event.pageX - x
      }
      if (wrapperWidth > this.minWidth) {
        this.wrapperWidth = wrapperWidth + 'px'
      }
    },

    /**
     * @description: 松开鼠标按钮事件
     * @param {*}
     */
    onMouseup() {
      if (!this.draggable) return
      this.canMove = false
      off(document, 'mousemove', this.onMousemove)
      off(document, 'mouseup', this.onMouseup)
    }
  },
  mounted() {
    this.append()
  },
  destroyed() {
    off(document, 'mousemove', this.onMousemove)
    off(document, 'mouseup', this.onMouseup)
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$emit('open')

        this.$nextTick(() => {
          this.$emit('opened')
        })
      } else {
        this.$emit('close')

        this.$nextTick(() => {
          this.$emit('closed')
        })
      }
    }
  }
}
</script>
