<template>
  <em-dialog v-bind="dialog" :visible.sync="visible_">
    <h3>请选择表单的列数</h3>
    <div class="form-cols">
      <div :class="['form-cols-item', active === item ? 'active' : '']" v-for="item in cols" :key="item" @click="onClick(item)">{{ item }}列</div>
    </div>
    <template v-slot:footer>
      <em-button type="success" size="small" @click="onConfirm">确定</em-button>
      <em-button type="info" size="small" @click="onClose">关闭</em-button>
    </template>
  </em-dialog>
</template>

<script>
import visible from '../../../../mixins/components/visible'
export default {
  mixins: [visible],
  data() {
    return {
      active: 0,
      cols: [1, 2, 3, 4],
      dialog: {
        title: '设置表单列数',
        icon: 'tags',
        header: true,
        footer: true,
        width: '640px',
        height: '320px',
        showClose: false
      }
    }
  },
  methods: {
    /**
     * @description: 点击事件
     * @param {*} item
     */
    onClick(item) {
      this.active = item
    },

    /**
     * @description: 确认
     * @param {*}
     */
    onConfirm() {
      if (!this.active) {
        this._error('请选择表单的列数')
        return
      }

      this.$emit('success', this.active)
      this.hide()
    },

    /**
     * @description: 关闭
     * @param {*}
     */
    onClose() {
      if (!this.active) {
        this._error('请选择表单的列数')
        return
      }
      this.hide()
    }
  }
}
</script>
