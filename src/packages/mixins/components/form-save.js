import visible from './visible'
export default {
  mixins: [visible],
  data() {
    return {
      formRef: 'form',
      model_: {},
      form: {
        icon: '',
        action: null,
        model: {
          id: null
        },
        customReset: null,
        disabled: this.readonly,
        footerCloseButton: true,
        loading: false
      },
      on: {
        success: this.onSuccess,
        open: this.onOpen
      }
    }
  },
  props: {
    //id不为空，标识编辑或预览，反之为新增
    id: [String, Number],
    //是否只读
    readonly: Boolean,
    //总数，用于有排序需求的默认值
    total: Number
  },
  computed: {
    //是否添加
    isAdd_() {
      return this.id === null || this.id === '' || typeof this.id === 'undefined'
    },
    //是否编辑
    isEdit_() {
      return !this.isAdd_
    }
  },
  methods: {
    /**
     * @description: 初始化
     * @param {*}
     */
    init() {
      const { form, title, readonly, actions } = this
      //添加
      if (this.isAdd_) {
        form.title = `新增${title}`
        form.icon = 'plus'
        form.customReset = null
        form.action = actions.add
        return
      }
      //编辑
      form.title = `${readonly ? '查看' : '编辑'}${title}`
      form.icon = readonly ? 'preview' : 'edit'
      form.customReset = this.reset
      form.action = actions.update
    },

    /**
     * @description: 重置
     * @param {*}
     */
    reset() {
      this.form.model = this.$_.merge({}, this.model_)
    },

    /**
     * @description: 获取数据
     * @param {*}
     */
    getData() {
      const { id, form, actions } = this
      form.loading = true
      actions
        .edit(id)
        .then((data) => {
          this.model_ = this.$_.merge({}, data)
          this.$refs[this.formRef].reset()
          form.loading = false
        })
        .catch(() => {
          form.loading = false
        })
    },

    /**
     * @description: 保存成功回调事件
     * @param {*} data
     */
    onSuccess(data) {
      this.$emit('success', this.form.model, data, this.isAdd_)
    },

    /**
     * @description: 窗口打开事件
     * @param {*}
     */
    onOpen() {
      this.init()
      if (this.isEdit_) this.getData()
      else this.$refs[this.formRef].reset()
    }
  },
  watch: {
    readonly(val) {
      this.form.disabled = val
    }
  }
}
