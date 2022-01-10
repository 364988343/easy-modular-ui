export default {
  data() {
    return {
      //当前选中项
      curr: { id: '' },
      dialog: {
        save: false
      },
      //只读
      readonly: false,
      //总数量
      total: 0
    }
  },
  computed: {
    tenantShow() {
      if (!this.$tenantType) return false
      return this.user.tenantType != this.$tenantType.normal
    }
  },
  methods: {
    /**
     * @description: 刷新
     * @param {*}
     */
    refresh() {
      this.$refs.list.refresh()
    },

    /**
     * @description: 添加
     * @param {*} total
     */
    add(total) {
      this.curr.id = ''
      this.total = total
      this.readonly = false
      this.dialog.save = true
    },

    /**
     * @description: 编辑
     * @param {*} row
     */
    edit(row) {
      this.curr.id = row.id
      this.readonly = false
      this.dialog.save = true
    },

    /**
     * @description: 预览
     * @param {*} row
     */
    preview(row) {
      this.curr.id = row.id
      this.readonly = true
      this.dialog.save = true
    }
  }
}
