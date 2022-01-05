<template>
  <div class="video-preview">
    <slot>
      <em-button type="text" :text="btnText" @click="visible = true"></em-button>
    </slot>
    <em-dialog v-bind="dialog" v-on="on" :visible.sync="visible">
      <div class="video-wrapper">
        <em-video ref="video" :src="src"></em-video>
      </div>
      <template v-slot:footer>
        <em-button type="info" size="small" @click="visible = false">关闭</em-button>
      </template>
    </em-dialog>
  </div>
</template>
<script>
export default {
  name: 'video-preview',
  data() {
    return {
      visible: false,
      selection: [],
      dialog: {
        title: this.title,
        icon: this.icon,
        width: this.width,
        height: this.height,
        fullscreen: this.fullscreen,
        footer: true,
        padding: 2
      },
      on: {
        open: this.onOpen,
        opened: this.onOpened,
        close: this.onClose,
        closed: this.onClosed
      }
    }
  },
  props: {
    //标题
    title: {
      type: String,
      default: '视频预览'
    },
    //图标
    icon: {
      type: String,
      default: 'search'
    },
    //视频路径
    src: {
      type: String,
      require: true
    },
    //按钮文字
    btnText: {
      type: String,
      default: '视频预览'
    },
    // Dialog 的宽度
    width: {
      type: String,
      default: '60%'
    },
    //Dialog 的高度
    height: {
      type: [Number, String],
      default: '80%'
    },
    //是否显示全屏按钮
    fullscreen: {
      type: Boolean,
      default: true
    },
    //列表模型
    list: Object,
    //多选
    multiple: Boolean
  },
  methods: {
    /**
     * @description: 显示窗口
     * @param {*}
     */
    show() {
      this.visible = true
    },

    /**
     * @description: 关闭窗口
     * @param {*}
     */
    hide() {
      this.visible = false
    },

    /**
     * @description: 打开事件
     * @param {*}
     */
    onOpen() {
      this.$emit('open')
    },

    /**
     * @description: 打开后事件
     * @param {*}
     */
    onOpened() {
      this.$emit('opened')
    },

    /**
     * @description: 关闭事件
     * @param {*}
     */
    onClose() {
      this.$emit('close')
    },

    /**
     * @description: 关闭后事件
     * @param {*}
     */
    onClosed() {
      this.$refs.video.stop()
      this.$emit('closed')
    }
  }
}
</script>
