<template>
  <div class="em-list-select">
    <slot name="btn">
      <em-button type="primary" :text="btnText" @click="visible = true"></em-button>
    </slot>
    <em-dialog v-bind="dialog" v-on="on" :visible.sync="visible">
      <em-list ref="list" v-bind="list" :multiple="multiple" noHeader noOperateBar noOperateColumn @select="onSelect" @select-all="onSelect" @row-click="onRowClick" @row-dblclick="onRowDbClick">
        <template v-slot:querybar>
          <slot name="querybar"></slot>
        </template>
        <template v-slot:[`col-${col.name}`]="{ row }" v-for="col in list.cols">
          <slot :name="'col-' + col.name" :row="row"></slot>
        </template>
      </em-list>

      <template v-slot:footer>
        <em-button type="success" size="small" @click="confirm">确认</em-button>
        <em-button type="info" size="small" @click="visible = false">关闭</em-button>
      </template>
    </em-dialog>
  </div>
</template>
<script>
export default {
  name: 'list-select',
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
    title: String,
    //图标
    icon: {
      type: String,
      default: 'search'
    },
    //按钮文字
    btnText: {
      type: String,
      default: '选择'
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
     * @description:确认
     * @param {*}
     */
    confirm() {
      this.$emit('change', this.selection)
      this.visible = false
    },

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
     * @description: 当某一行被点击时会触发该事件
     * @param {*}
     */
    onRowClick(row) {
      if (this.multiple) return
      this.selection = []
      this.selection.push(row)
    },

    /**
     * @description: 当某一行被双击时会触发该事件
     * @param {*} row
     */
    onRowDbClick(row) {
      if (this.multiple) return
      this.$emit('change', row)
      this.show = false
    },
    /**
     * @description: 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param {*}
     */
    onSelect(rows) {
      this.selection = rows
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
      this.$refs.list.refresh()
      this.$refs.list.doLayout()
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
      this.$emit('closed')
    }
  }
}
</script>
