<template>
  <el-form
    class="em-form"
    ref="form"
    :model="model"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :size="fontSize"
    :inline="inline"
    :disabled="disabled"
    v-loading="showLoading"
    :element-loading-text="loadingText"
    :element-loading-background="loadingBackground"
    :element-loading-spinner="loadingSpinner"
  >
    <slot />
  </el-form>
</template>
<script>
import loading from '../../mixins/components/loading'
export default {
  name: 'Form',
  mixins: [loading],
  data() {
    return {
      loading_: false
    }
  },
  props: {
    //表单对象
    model: {
      type: Object,
      required: false
    },
    //验证规则
    rules: Object,
    //提交请求
    action: Function,
    //行内表单模式
    inline: Boolean,
    //是否显示成功提示消息
    successMsg: {
      type: Boolean,
      default: true
    },
    //成功提示消息文本
    successMsgText: {
      type: String,
      default: '保存成功'
    },
    //标签的宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
    labelPosition: {
      type: String,
      default: 'right'
    },
    //禁用表单
    disabled: Boolean,
    //显示加载动画
    loading: Boolean,
    //不显示加载动画
    noLoading: Boolean,
    
    //自定义验证
    customValidate: Function,
    //额外验证
    extraValidate: Function,
    //自定义重置操作
    customReset: Function,
    //额外重置（除el-form自带的重置）
    extraReset: Function
  },
  computed: {
    showLoading() {
      return !this.noLoading && (this.loading_ || this.loading)
    }
  },
  methods: {
    /**
     * @description: 提交表单
     */
    async submit() {
      const valid = this.validate()
      if (!valid) {
        this.$emit('validate-error')
        return
      }

      this.openLoading()
      this.action(this.model)
        .then((data) => {
          if (this.successMsg === true) {
            this._success(this.successMsgText)
          }

          this.$emit('success', data)

          this.closeLoading()
        })
        .catch(() => {
          this.$emit('error')
          this.closeLoading()
        })
    },

    /**
     * @description: 校验
     * @param {*}
     */
    validate() {
      let result = false
      if (this.customValidate) {
        result = this.customValidate()
      } else {
        this.$refs.form.validate((valid) => {
          result = valid
        })
      }

      if (!result) return result

      if (this.extraValidate && this.extraValidate() === false) return false

      return true
    },

    /**
     * @description: 重置表单
     */
    reset() {
      if (this.customReset) {
        this.customReset()
      } else {
        this.$refs.form.resetFields()
        if (this.extraReset) {
          this.extraReset()
        }
      }
      this.$emit('reset')
    },

    /**
     * @description: 清除验证结果
     */
    clearValidate(props) {
      this.$refs.form.clearValidate(props)
    },

    /**
     * @description: 打开加载中
     */
    openLoading() {
      if (!this.noLoading) {
        this.loading_ = true
      }
    },

    /**
     * @description: 关闭加载中
     */
    closeLoading() {
      if (!this.noLoading) {
        this.loading_ = false
      }
    }
  }
}
</script>
