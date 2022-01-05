<template>
  <el-dialog
    ref="dialog"
    :id="id"
    :class="class_"
    :top="top"
    :modal="modal"
    :close-on-click-modal="closeOnClickModal_"
    :fullscreen="hasFullscreen"
    :visible.sync="visible_"
    :show-close="false"
    :append-to-body="true"
    v-on="on"
    v-em-dialog-drag="draggable"
  >
    <!--头部-->
    <template v-slot:title>
      <div v-if="icon" class="em-dialog-icon">
        <em-icon :name="icon" :style="{ color: iconColor || '' }" />
      </div>
      <div ref="title" class="em-dialog-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="em-dialog-toolbar">
        <!--工具栏插槽-->
        <slot name="toolbar" />
        <!--全屏按钮-->
        <em-button v-if="fullscreen" :icon="hasFullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="triggerFullscreen" />
        <!--关闭按钮-->
        <em-button v-if="showClose" icon="close" @click="close" />
      </div>
    </template>

    <!--Body-->
    <div ref="dialogBody" class="em-dialog-body" v-loading="loading" :element-loading-text="loadingText" :element-loading-background="loadingBackground" :element-loading-spinner="loadingSpinner">
      <div ref="dialogContent" class="em-dialog-content">
        <slot v-if="noScrollbar" />
        <em-scrollbar v-else ref="scrollbar" class="em-dialog-body-scrollbar" :horizontal="horizontal">
          <slot />
        </em-scrollbar>
      </div>
      <div v-if="footer" class="em-dialog-footer">
        <div class="em-dialog-footer-left">
          <slot name="footer-left" />
        </div>
        <div class="em-dialog-footer-right">
          <slot name="footer" />
          <!--底部关闭按钮-->
          <em-button type="info" v-if="footerCloseButton" text="关闭" @click="close" />
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import { on, off } from '../../utils/dom'
import visible from '../../mixins/components/visible.js'
export default {
  name: 'Dialog',
  mixins: [visible],
  data() {
    return {
      id: '',
      //是否已全屏
      hasFullscreen: false,
      //距顶部高度
      top: '',
      on: {
        open: this.onOpen,
        opened: this.onOpened,
        close: this.onClose,
        closed: this.onClosed
      }
    }
  },
  props: {
    //显示头部
    header: {
      type: Boolean,
      default: true
    },
    //标题
    title: String,
    //图标
    icon: String,
    //图标颜色
    iconColor: String,
    //的宽度（默认50%）
    width: {
      type: [Number, String],
      default: '50%'
    },
    //的高度
    height: [Number, String],
    //内边距（默认8px）
    padding: {
      type: [Number, String],
      default: 8
    },
    //显示底部
    footer: Boolean,
    //是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    //是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: null
    },
    //是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    //关闭前的回调，会暂停 Dialog 的关闭
    beforeClose: Function,
    //是否显示全屏按钮
    fullscreen: Boolean,
    //显示加载动画
    loading: Boolean,
    //可拖拽的
    draggable: {
      type: Boolean,
      default: true
    },
    //是否可拖出页面
    dragOutPage: Boolean,
    //拖拽出页面后保留的最小宽度
    dragMinWidth: {
      type: Number,
      default: 100
    },
    //是否显示底部关闭按钮
    footerCloseButton: Boolean,
    //不显示滚动条
    noScrollbar: Boolean,
    //是否显示水平滚动条
    horizontal: Boolean
  },
  computed: {
    ...mapState('app/loading', { loadingText: 'text', loadingBackground: 'background', loadingSpinner: 'spinner' }),
    class_() {
      return ['em-dialog', this.header ? '' : 'no-header']
    },
    width_() {
      return typeof this.width === 'number' ? (this.width > 0 ? this.width + 'px' : '50%') : this.width
    },
    padding_() {
      return typeof this.padding === 'number' ? (this.padding > 0 ? this.padding + 'px' : '50%') : this.padding
    },
    closeOnClickModal_() {
      return this.closeOnClickModal
    },
    dialogEl() {
      return this.$refs.dialog.$el.querySelector('.el-dialog')
    },
    titleEl() {
      return this.$refs.title
    }
  },
  methods: {
    ...mapActions('app/dialog', ['open']),
    /**
     * @description:全屏切换
     */
    triggerFullscreen() {
      if (this.hasFullscreen) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    },

    /**
     * @description: 开启全屏
     * @param {*}
     * @return {*}
     */
    openFullscreen() {
      this.hasFullscreen = true
      this.$emit('fullscreen-change', this.hasFullscreen)
    },

    /**
     * @description:关闭全屏
     */
    closeFullscreen() {
      this.hasFullscreen = false
      this.$emit('fullscreen-change', this.hasFullscreen)
    },

    /**
     * @description: 关闭对话框
     */
    close() {
      this.hide()
    },

    /**
     * 调整高度
     */
    resize() {
      // 对话框高度
      const dialogHeight = this.getDialogHeight()
      // 页面高度
      const bodyHeight = document.body.clientHeight

      let height
      if (dialogHeight + 20 > bodyHeight) {
        this.top = '10px'
        height = bodyHeight - this.getDialogHeaderHeight() - this.getDialogFooterHeight() - 20 + 'px'
      } else {
        this.top = ((bodyHeight - dialogHeight) / 7) * 2.5 + 'px'
        height = dialogHeight + 'px'
      }

      this.dialogEl.style.height = height
      this.dialogEl.style.width = this.width_

      // 设置内边距
      if (this.padding) {
        this.dialogEl.querySelector(this.noScrollbar ? '.em-dialog-content' : '.el-scrollbar__view').style.padding = this.padding + 'px'
      }
    },

    /**
     * @description: 获取对话框的高度信息
     */
    getDialogHeight() {
      const headerH = this.getDialogHeaderHeight()
      const contentH = this.getDialogContentHeight()
      const footerH = this.getDialogFooterHeight()

      if (this.height) {
        if (typeof this.height === 'number' && this.height > 0) {
          return this.height
        } else {
          if (this.height.endsWith('px')) {
            return parseFloat(this.height.replace('px', ''))
          } else {
            return (document.body.clientHeight * parseFloat(this.height.replace('%', ''))) / 100 - headerH - footerH
          }
        }
      }
      return headerH + contentH + footerH
    },

    /**
     * @description: 获取对话框的头部高度
     */
    getDialogHeaderHeight() {
      const headerEl = this.dialogEl.querySelector('.el-dialog__header')
      const headerH = headerEl ? headerEl.offsetHeight : 0
      return headerH
    },

    /**
     * @description: 获取对话框的body高度
     */
    getDialogContentHeight() {
      const conetntEl = this.dialogEl.querySelector(this.noScrollbar ? '.em-dialog-content' : '.el-scrollbar__view')
      const conetntH = conetntEl ? conetntEl.offsetHeight : 0

      let otherH = this.noScrollbar ? 0 : 17
      if (typeof this.padding === 'number' && this.padding > 0) {
        otherH += this.padding * 2
      } else if (this.padding && this.padding.endsWith('px')) {
        otherH += parseFloat(this.padding.replace('px', '')) * 2
      }

      return conetntH + otherH
    },

    /**
     * @description: 获取对话框的底部高度
     */
    getDialogFooterHeight() {
      const footerEl = this.dialogEl.querySelector('.em-dialog-footer')
      const footerH = footerEl ? footerEl.offsetHeight : 0
      return footerH
    },

    /**
     * @description: Dialog 打开的回调
     */
    onOpen() {
      this.$nextTick(() => {
        this.resize()

        on(window, 'resize', this.resize)
      })

      this.$emit('open')
    },

    /**
     * @description: Dialog 打开动画结束时的回调
     */
    onOpened() {
      this.$emit('opened')
    },

    /**
     * @description: Dialog 关闭的回调
     */
    onClose() {
      off(window, 'resize', this.resize)
      this.$emit('close')
    },

    /**
     * @description: 	Dialog 关闭动画结束时的回调
     */
    onClosed() {
      this.$emit('closed')
    }
  },
  mounted() {
    // 打开对话框
    this.open().then((id) => {
      this.id = 'em-dialog-' + id
    })
  }
}
</script>
