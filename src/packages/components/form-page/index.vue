<template>
  <em-panel ref="page" class="em-form-page" v-bind="panel">
    <div class="em-form-page-body">
      <em-form v-bind="form" v-on="formOn">
        <slot></slot>
      </em-form>
    </div>

    <!--底部-->
    <template v-slot:footer class="em-form-page-footer">
      <div class="em-form-page-footer-left">
        <slot name="footer-left" />
      </div>
      <div class="em-form-page-footer-right">
        <slot name="fotter">
          <el-button v-if="btnOk" :type="btnOkType" @click="submit" :size="fontSize" :disabled="disabled">{{ btnOkText }}</el-button>
          <el-button v-if="btnReset" type="info" @click="reset" :size="fontSize" :disabled="disabled">重置</el-button>
        </slot>
      </div>
    </template>
  </em-panel>
</template>
<script>
export default {
  name: 'form-page',
  data() {
    return {
      loading: false,
      panel: {
        //页模式
        page: true,
        //是否显示头部
        header: this.header,
        //标题，
        title: this.title,
        //头部左侧的图标
        icon: this.icon,
        //是否显示底部
        footer: !this.noFooter,
        //内边距
        padding: this.padding,
        //是否显示全屏按钮
        fullscreen: this.fullscreen,
        //是否显示loading动画
        loading: !this.noLoading && this.loading
      },
      form: {
        //不显示动画
        noLoading: true,
        //表单对象
        model: this.model,
        //验证规则
        rules: this.rules,
        //提交请求
        action: this.action,
        //标签的宽度
        labelWidth: this.labelWidth,
        //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
        labelPosition: this.labelPosition,
        //是否显示成功提示消息
        successMsg: this.successMsg,
        //成功提示消息文本
        successMsgText: this.successMsgText,
        //禁用表单
        disabled: this.disabled,
        //行内表单模式
        inline: this.inline,
        //自定义校验
        customValidate: this.customValidate,
        //额外校验
        extraValidate: this.extraValidate,
        //自定义重置
        customReset: this.customReset,
        //额外重置
        extraReset: this.extraReset
      },
      formOn: {
        //保存成功
        success: this.onSuccess,
        //保存失败
        error: this.onError,
        //重置
        reset: this.onReset,
        //验证失败
        'validate-error': this.onValidateError
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
    //box图标
    icon: {
      type: String,
      default: 'detail'
    },
    //表单
    model: {
      type: Object,
      required: false
    },
    //验证规则
    rules: Object,
    //提交请求
    action: {
      type: Function,
      required: false
    },
    //行内表单
    inline: Boolean,
    //标签的宽度
    labelWidth: String,
    //表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
    labelPosition: String,
    //内边距（默认8px）
    padding: {
      type: [Number, String],
      default: 8
    },
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
    //Ok按钮
    btnOk: {
      type: Boolean,
      default: true
    },
    //Ok按钮文本
    btnOkText: {
      type: String,
      default: '保存'
    },
    //Ok按钮类型
    btnOkType: {
      type: String,
      default: 'primary'
    },
    //reset按钮
    btnReset: {
      type: Boolean,
      default: true
    },
    //是否显示全屏按钮
    fullscreen: {
      type: Boolean,
      default: true
    },
    //禁用表单
    disabled: Boolean,
    //不显示底部
    noFooter: Boolean,
    //不显示加载动画
    noLoading: Boolean,

    //自定义验证
    customValidate: Function,
    // 额外验证
    extraValidate: Function,
    //自定义重置操作
    customReset: Function,
    //额外重置（除el-form自带的重置）
    extraReset: Function
  },
  methods: {
    /**
     * @description: 提交表单
     */
    submit() {
      this.loading = true
      this.$refs.form.submit()
    },

    /**
     * @description: 重置表单
     */
    reset() {
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },

    /**
     * @description: 清除验证信息
     */
    clearValidate() {
      this.$refs.form.clearValidate()
    },

    /**
     * @description: 打开loading
     * @param {*}
     * @return {*}
     */
    openLoading() {
      this.loading = true
      this.$refs.form.openLoading()
    },

    /**
     * @description: 关闭loading
     */
    closeLoading() {
      this.loading = false
      this.$refs.form.closeLoading()
    },

    /**
     * @description:成功
     */
    onSuccess(data) {
      this.loading = false
      this.$emit('success', data)
    },

    /**
     * @description: 重置
     * @param {*}
     */
    onReset() {
      this.$emit('reset')
    },

    /**
     * @description: 处理失败
     * @param {*}
     */
    onError() {
      this.loading = false
      this.$emit('error')
    },

    /**
     * @description: 校验失败
     * @param {*}
     */
    onValidateError() {
      this.loading = false
      this.$emit('validate-error')
    }
  }
}
</script>
